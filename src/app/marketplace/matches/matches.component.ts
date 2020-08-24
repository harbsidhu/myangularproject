import { Component, OnInit } from '@angular/core';
import { SelectItem } from '../../_models/selectItem';
import { ResourceListType } from '../../_models/resourceListType';
import { ResourceService } from '../../_services/resource.service';
import { MasterdataService } from '../../_services/masterdata.service';
import { DashboardService } from '../../_services/dashboard.service';
import { StorageService } from '../../_services/storage.service';
import { User } from '../../_models/user';
import { CompleterData, CompleterService } from 'ng2-completer';
import { Router } from '@angular/router';
import { AnonymousUser } from '../../_models/anonymousUser';

@Component({
    selector: 'ngx-matches',
    templateUrl: './matches.component.html',
    styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
    isMenuCollapse: boolean = false;
    _user: User;
    isRegisteredUser: boolean = true;
    isUser: boolean = false;
    userState: string = '';
    _addresses: Array<SelectItem> = new Array;
    locationFilterType: number = 1;
    locationFilterAddressId: number;
    locationFilterKms: number;

    public search1 = '';
    _searchInputValue: any;
    protected dataService: CompleterData;
    resourcesSearch: Array<SelectItem> = new Array;

    _commids: Array<number> = new Array;
    _typeids: Array<number> = new Array;

    public innerWidth: any;
    public resources: any;
    public commodities: Array<SelectItem> = new Array;
    public resourceListingtypes: Array<ResourceListType> = new Array;

    constructor(
        private router: Router,
        private dashboardService: DashboardService,
        private resourceService: ResourceService,
        private completerService: CompleterService,
        private masterdataService: MasterdataService,
        private storageService: StorageService) {
    }

    ngOnInit() {
        this.checkUser();
        this.isMenuCollapse = window.innerWidth < 500;
        this._user = this.storageService.getItem('user');
        this.GetCommoditiesForFilters();
        this.getResourcesForMarket();
        this.getReourceLiistingType();
        this.getReousrcesForSearch();
        this.dataService = this.completerService.local(this.resourcesSearch, 'name', 'name');
        this.locationFilterType = this.isRegisteredUser ? 2 : 1;

    }

    checkUser = () => {
        const user = this.storageService.getItem('user');
        const anonymousUser = this.storageService.getItem('anonymousUser');

        if (user === null) {
            this.isRegisteredUser = false;
            if (anonymousUser === null) {
                this.isUser = false;
            } else {
                this.isUser = this.checkAnonymousUserTimeStamp();
            }
        } else {
            this.isUser = true;
            this.userState = user.company.addresses.find(a => a.isPrimary).state;
            this._addresses = user.company.addresses.map(x => ({ id: x.id, name: x.fullAddress }));

        }
    }

    checkAnonymousUserTimeStamp = () => {
        const anonymousUser: AnonymousUser = this.storageService.getItem('anonymousUser');
        const timeStamp: Date = new Date(anonymousUser.lastVisited);
        const plusTenMins: Date = new Date(timeStamp);
        plusTenMins.setHours(plusTenMins.getHours() + 23);

        if (anonymousUser !== null) {
            if (new Date() < plusTenMins) {
                return true;
            } else {
                this.storageService.clear('anonymousUser');
                return false;
            }
        } else {
            return false;
        }
    }

    selectedStatic(result) {
        if (result.name !== undefined) {
            this.search1 = result.name;
        }
        this.getResourcesForMarket();
    }

    getReousrcesForSearch() {
        this.resourceService.getResourcesForSearch()
            .subscribe(res => {
                let resourcesSearch: Array<SelectItem> = new Array;
                resourcesSearch = res;

                this.resourcesSearch = resourcesSearch.filter((thing, name, arr) => {
                    return arr.indexOf(arr.find(t => t.name === thing.name)) === name;
                });
            });
    }

    search(event) {
        this.search1 = event.target.value.trim();
        this.getResourcesForMarket();
    }

    searchInputchange(event) {
        this._searchInputValue = event.target.value;
        this.search1 = event.target.value;
    }

    getComFilter(event, id) {
        if (event === false) {
            const index: number = this._commids.indexOf(id);
            if (index !== -1) {
                this._commids.splice(index, 1);
            }
        } else {
            this._commids.push(id);
        }
    }

    getPriceFilter(event, id) {
        if (event === false) {
            const index: number = this._typeids.indexOf(id);
            if (index !== -1) {
                this._typeids.splice(index, 1);
            }
        } else {
            this._typeids.push(id);
        }
    }

    applyFilter(filter) {
        this.locationFilterAddressId = filter.locationFilterAddressId;
        this.locationFilterType = filter.locationFilterType;
        this._commids = filter._commids;
        this.locationFilterKms = filter.locationFilterKms,
        this.getResourcesForMarket();
    }

    getResourcesForMarket() {

        this.search1 = this.search1 === ''
            ? this._searchInputValue !== undefined
                ? this._searchInputValue : ''
            : this.search1;
            
        this.dashboardService.getResourceMatches(this._user.company.id, 100, 1, this._commids, this._typeids, this.search1, this.locationFilterType, this.locationFilterAddressId, this.locationFilterKms)
            .subscribe(res => {
                this.resources = res;

                this.resources = this.resources.sort(function (r1, r2) {
                    if (r1.distanceInKms > r2.distanceInKms) return 1;
                    if (r1.distanceInKms < r2.distanceInKms) return -1;

                    if (r1.imageName > r2.imageName) return -1;
                    if (r1.imageName < r2.imageName) return 1;

                });
            });
    }

    GetCommoditiesForFilters() {
        this.resourceService.getCommodities()
            .subscribe(res => {
                this.commodities = res;
            });
    }

    getReourceLiistingType() {
        this.masterdataService.getResourceListTypes()
            .subscribe(res => {
                this.resourceListingtypes = res;
            });
    }

    navigateToDashBoard() {
        this.router.navigate(['dash/dashboard']);
    }
    toggleFilters() {
        this.isMenuCollapse = !this.isMenuCollapse;
    }
}
