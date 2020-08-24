import { Injectable } from '@angular/core';
import { ApiCallService } from './apiCall.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DashboardService extends ApiCallService {

    constructor(public http: HttpClient) {
        super(http);
        this.set('/api/dashboard/');
    }

    getResourcesOut(id: any) {
        return this.getDetail(id, 'resourcesout');
    }
    getResourcesIn(id: any) {
        return this.getDetail(id, 'resourcesin');
    }

    getResourceMatches(id: number, count: number, currentIndex: number, commIds: any, typeIds: any, searchToken: string, locationFilterType?: number, locationFilterAddressId?: number, locationFilterKms?: number) {
        let comms: any;
        let types: any;
        if (commIds === undefined) {
            comms = '-1';
        } else if (commIds.length > 0) {
            comms = commIds.join(', ');
        } else {
            comms = '-1';
        }

        if (typeIds === undefined) {
            types = '-1';
        } else if (typeIds.length > 0) {
            types = typeIds.join(', ');
        } else {
            types = '-1';
        }

        let params = new HttpParams();
        params = params.append('count', count.toString());
        params = params.append('currentIndex', currentIndex.toString());
        params = params.append('commids', comms);
        params = params.append('typeids', types);
        params = params.append('searchToken', searchToken);

        if (locationFilterType)
            params = params.append('locationFilterType', locationFilterType.toString());

        if (locationFilterType && locationFilterAddressId)
            params = params.append('locationFilterAddressId', locationFilterAddressId.toString());

        if (locationFilterType && locationFilterKms)
            params = params.append('locationFilterKms', locationFilterKms.toString());


        return this.http.get(this.fullUrl() + 'matches/' + id, { params: params, headers: this._headers });
    }

    getDashboardData(id: any) {
        return this.getDetail(id, 'dashboard');
    }
}
