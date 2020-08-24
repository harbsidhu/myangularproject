import { Injectable } from '@angular/core';
import { ApiCallService } from './apiCall.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentService extends ApiCallService {
    constructor(public http: HttpClient) {
        super(http);
        this.set('/api/payment/');
    }
}
