import { Injectable } from '@angular/core';
import { ApiCallService } from './apiCall.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResourceOfferService extends ApiCallService {

    constructor(public http: HttpClient) {
        super(http);
        this.set('/api/resourceoffer/');
    }

    createResourceOffer(data: any) {
        return this.http.post(this.fullUrl(), data, { headers: this._headers, observe: 'response' })
            .pipe(
                map(resp => this.extractResultBodyData(resp)),
                catchError(this.handleError),
            );
    }

    getOffersForGridsByCompany(id: number) {
        return this.getDetail(id, 'grid');
    }

    getResourcesInByCompanyForGrid(id: number) {
        return this.getDetail(id, 'resourcegrid');
    }

    approveOffer(id: number){
        return this.put2('approve/', id.toString());
    }

    rejectOffer(id: number) {
        return this.put2('reject/', id.toString());
    }
}
