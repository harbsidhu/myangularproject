import { ApiCallService } from './apiCall.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CouncilDashboardService extends ApiCallService {

    constructor(public http: HttpClient) {
        super(http);
        this.set('/api/councildashboard/');
    }

    getCouncilDashboard(id: any) {
        return this.getDetail(id);
    }
}
