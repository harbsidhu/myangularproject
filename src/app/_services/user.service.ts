import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from './apiCall.service';
import { OperationResult } from '../_models/operationResult';
import { catchError, map } from 'rxjs/operators';
import { User } from '../_models/user';
import { OpsBodyResponse } from '../_models/operationResponseWithBody';

@Injectable()
export class UserService extends ApiCallService {
  Users: User[];

  constructor(public http: HttpClient) {
    super(http);
    this.set('/api/Users/');
  }

  getUsers(): Observable<any> {
    return this.get();
  }

  getUser(id: string): Observable<any> {

    return this.getDetail(+id);
  }

  deleteUser(id: string): Observable<Response> {
    return this.http.delete<Response>(this.fullUrl() + id , {headers: this._headers});
  }

  createUser(data: any): Observable<OperationResult> {
    return this.http.post(this.fullUrl(), data, { headers: this._headers, observe: 'response' })
      .pipe(
        map(resp => this.extractOpsResultData(resp)),
        catchError(this.handleError),
      );
  }

  createAnonymousUser(data: any): Observable<OpsBodyResponse> {
    return this.http.post(this.fullUrl() + 'createAnonUser', data, { headers: this._headers, observe: 'response' })
    .pipe(
      map(resp => this.extractResultBodyData(resp)),
      catchError(this.handleError),
    );
  }

  updateUser(data: any): Observable<OperationResult> {
    return this.http.put(this.fullUrl(), data, { headers: this._headers, observe: 'response', params: data.id })
      .pipe(
        map(resp => this.extractOpsResultData(resp)),
        catchError(this.handleError),
      );
  }

  sendContactUsEmail(data: any) {
    return this.http.post(this.fullUrl() + 'contactus', data, { headers: this._headers, observe: 'response' });
  }

  sendConfirmationEmail(data: any) {
    return this.http.post(this.fullUrl() + 'sendconfirmation', data, { headers: this._headers, observe: 'response' })
    .pipe(
      map(resp => this.extractOpsResultData(resp)),
      catchError(this.handleError),
    );
  }

  userConfirmation(data: any) {
    return this.http.post(this.fullUrl() + 'confirmation', data, { headers: this._headers, observe: 'response' })
    .pipe(
      map(resp => this.extractOpsResultData(resp)),
      catchError(this.handleError),
    );
  }
}
