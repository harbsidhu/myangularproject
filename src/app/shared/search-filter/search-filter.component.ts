import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ngx-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
    isMenuCollapse: boolean;
    @Input() title: string;
    @Input() commodities;
    @Input() locationFilterKms;
    @Input() _addresses;
    @Input() resourceListingtypes;
    @Input() isRegisteredUser;
    @Input() locationFilterType;
    @Input() locationFilterAddressId;
    @Input() userState;
    @Input() _commids;
    @Input() _typeids;

    @Output() applyFilter = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    apply = () => {
        const filter = {
            locationFilterAddressId: this.locationFilterAddressId,
            locationFilterKms: this.locationFilterKms,
            locationFilterType: this.locationFilterType,
            _commids: this._commids,
            _typeids: this._typeids,
        }
        this.applyFilter.emit(filter);
    }

    toggleFilters = () => {
        this.isMenuCollapse = !this.isMenuCollapse;
    }

    getComFilter = (event, id) => {
        if (event === false) {
            const index: number = this._commids.indexOf(id);
            if (index !== -1) {
                this._commids.splice(index, 1);
            }
        } else {
            this._commids.push(id);
        }
    }

    getPriceFilter = (event, id) => {
        if (event === false) {
            const index: number = this._typeids.indexOf(id);
            if (index !== -1) {
                this._typeids.splice(index, 1);
            }
        } else {
            this._typeids.push(id);
        }
    }
}
