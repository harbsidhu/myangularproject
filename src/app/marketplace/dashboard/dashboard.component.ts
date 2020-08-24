import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ResourceForMarket } from '../../_models/resourceForMarket';
import { ResourceListingService } from '../../_services/resourceListing.service';
import { ResourceService } from '../../_services/resource.service';
import { SelectItem } from '../../_models/selectItem';
import { MasterdataService } from '../../_services/masterdata.service';
import { ResourceListType } from '../../_models/resourceListType';
import { CompleterData, CompleterService } from 'ng2-completer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../_services/storage.service';
import { AnonymousUser } from '../../_models/anonymousUser';
import { UserService } from '../../_services/user.service';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    isUser: boolean = false;
    isRegisteredUser: boolean = true;
    isMenuCollapse: boolean = false;
    _location: Location;

    _anonymousUser: any;
    _searchInputValue: any;
    public search1 = '';
    protected dataService: CompleterData;
    resourcesSearch: Array<SelectItem> = new Array;
    resourcesSearchFiltered: Array<SelectItem> = new Array;
    userState: string = '';
    pageSize = 16;
    pageToLoadNext = 1;
    loading = false;

    @ViewChild('searchBox', null) searchBox: ElementRef;

    anonymousForm: FormGroup;

    _addresses: Array<SelectItem> = new Array;

    _commids: Array<number> = new Array;
    _typeids: Array<number> = new Array;
    locationFilterType: number = 1;
    locationFilterAddressId: number;
    locationFilterKms: number;

    public innerWidth: any;
    public resources: any;
    public commodities: Array<SelectItem> = new Array;
    public resourceListingtypes: Array<ResourceListType> = new Array;
    public termAgreed: boolean = false;
    public isTermError: boolean = false;

    constructor(private location: Location,
        private resourceListingService: ResourceListingService,
        private resourceService: ResourceService,
        private completerService: CompleterService,
        private masterdataService: MasterdataService,
        private storageService: StorageService,
        private userService: UserService,
        private fb: FormBuilder,
        private router: Router) {
        this._location = location;
    }

    ngOnInit() {
        this.checkUser();
        this.anonymousForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
        });
        this.isMenuCollapse = window.innerWidth < 500;
        this.locationFilterType = this.isRegisteredUser ? 2 : 1;
        this.GetCommoditiesForFilters();
        this.getResourcesForMarket();
        this.getReourceLiistingType();
        this.getReousrcesForSearch();
        this.dataService = this.completerService.local(this.resourcesSearch, 'name', 'name');
    }

    checkUser() {
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

    toggleFilters() {
        this.isMenuCollapse = !this.isMenuCollapse;
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

    getResourcesForMarket() {
        this.search1 = this.search1 === ''
            ? this._searchInputValue !== undefined
                ? this._searchInputValue : ''
            : this.search1;

        this.resourceListingService.getResourceForMarket(
            this.pageSize, this.pageToLoadNext,
            this._commids, this._typeids, this.search1,
            this.locationFilterType, this.locationFilterAddressId, this.locationFilterKms)
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

    // Lazy load trials
    // // loadNext() {
    // //   if (this.loading) { return }

    // //   this.loading = true;

    // //   // this.resourceListingService.load(this.pageToLoadNext, this.pageSize)
    // //   //   .subscribe(news => {
    // //   //     this.placeholders = [];
    // //   //     this.news.push(...news);
    // //   //     this.loading = false;
    // //   //     this.pageToLoadNext++;
    // //   //   });

    // //     this.search1 = this.search1 === ''
    // //     ? this._searchInputValue !== undefined
    // //     ? this._searchInputValue : ''
    // //     : this.search1 ;
    // //     this.resourceListingService.getResourceForMarket(
    // //       this.pageSize, this.pageToLoadNext ,
    // //       this._commids, this._typeids, this.search1)
    // //       .subscribe(res => {
    // //         this.resources = res;
    // //         this.loading = false;
    // //         this.pageToLoadNext++;
    // //         // console.log(JSON.stringify(this.resources));
    // //       });
    // // }


    GetCommoditiesForFilters() {
        this.resourceService.getCommodities()
            .subscribe(res => {
                this.commodities = res;
                this.commodities = this.commodities.sort((c1, c2) => {
                    return c1.name > c2.name ? 1 : c1.name < c2.name ? -1 : 0;
                });
            });
    }

    getReourceLiistingType() {
        this.masterdataService.getResourceListTypes()
            .subscribe(res => {
                this.resourceListingtypes = res;

                this.resourceListingtypes = this.resourceListingtypes.sort((r1, r2) => {
                    return r1.label > r2.label ? 1 : r1.label < r2.label ? -1 : 0;
                });
            });
    }

    navigateToDashBoard() {
        this.router.navigate(['dash/dashboard']);
    }

    navigateBack() {
        this._location.back();
    }

    createAnonymousUser() {

        if (!this.termAgreed) {
            this.isTermError = true;
        } else {

            const anonUser = new AnonymousUser();
            anonUser.firstName = this.anonymousForm.value.firstName;
            anonUser.lastName = this.anonymousForm.value.lastName;
            anonUser.email = this.anonymousForm.value.email;
            anonUser.phone = this.anonymousForm.value.phone;
            anonUser.TermsAgreed = true;

            this.userService.createAnonymousUser(anonUser)
                .subscribe(res => {
                    this._anonymousUser = res.responseBody;
                    this.storageService.store('anonymousUser', this._anonymousUser);
                    this.isUser = true;
                });
        }
    }

    toggle(checked: boolean) {
        this.termAgreed = checked;
    }

    checkAnonymousUserTimeStamp() {
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
}
