import { ApiCallService } from './apiCall.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { OpsBodyResponse } from '../_models/operationResponseWithBody';

@Injectable()
export class CompanyService extends ApiCallService {

    constructor(public http: HttpClient) {
        super(http);
        this.set('/api/company/');
      }

      createCompany(data: any): Observable<OpsBodyResponse> {
        return this.http.post(this.fullUrl(), data, { headers: this._headers, observe: 'response' })
          .pipe(
            map(resp => this.extractResultBodyData(resp)),
            catchError(this.handleErrorWithMessage),
          );
      }

      updateCompany(data: any): Observable<OpsBodyResponse> {
        return this.http.put(this.fullUrl(), data, { headers: this._headers, observe: 'response' })
          .pipe(
            map(resp => this.extractResultBodyData(resp)),
            catchError(this.handleError),
          );
      }

      updateCompanyRegistration(data: any): Observable<OpsBodyResponse> {
        return this.http.put(this.fullUrl() + 'updateRegistration/' + data, data,
            { headers: this._headers, observe: 'response' })
        .pipe(
          map(resp => this.extractResultBodyData(resp)),
          catchError(this.handleError),
        );
      }

      getSubscriptionPlan(noOfEmployees: string, isRecycler: string, isCouncil: string, promocode: string): Observable<any> {
        const httpParams = new HttpParams()
            .set('noOfEmployees', encodeURIComponent(noOfEmployees))
            .set('isRecycler', isRecycler)
            .set('isCouncil', isCouncil)
            .set('promoCode', promocode);

        return this.getUrlWithParams('subscription', httpParams);
    }

    createComapnySubscription(data: any ) {
      return this.http.post(this.fullUrl() + 'subscription', data, { headers: this._headers, observe: 'response' });
    }

    getCompanyDetailsByABN(data: string) {
      return this.getUrl("abnlookup/" + data);
    }

    getCompanyForCouncil(id: string) {
      return this.getUrl('forcouncil/' + id);
    }

    markCompanyAsMigrated(id: any) {
      return this.put2('migratecompany/', id);
  }
}
