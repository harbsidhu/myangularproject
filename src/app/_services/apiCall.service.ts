import {HttpClient, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {OperationResult} from '../_models/operationResult';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { OpsBodyResponse } from '../_models/operationResponseWithBody';

@Injectable()
export class ApiCallService {
    public _baseUrl: string;
    public _apiUrl: string;
    protected _progress = 0;
    protected _headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(public http: HttpClient) {
        this._baseUrl = environment.base_url;
    }

    protected fullUrl = (): string => {
        return this._baseUrl + this._apiUrl;
    }

    get = (): Observable<any> => {
        return this.http.get<any>(this.fullUrl());
    }

    set = (apiUrl: string): void => {
        this._apiUrl = apiUrl;
    }

    getUrl = (path: string): Observable<any> => {
        return this.http.get(this.fullUrl() + path, {headers: this._headers});
    }

    getUrlWithParams = (path: string, params: HttpParams): Observable<any> => {
        return this.http.get(this.fullUrl() + path, {params: params, headers : this._headers} );
    }

    getDetail = (id: number, path?: string): Observable<any> => {
        let url = typeof path !== 'undefined' ? this.fullUrl() + path  + '/' : this.fullUrl();
        url = url +  id.toString();
        return this.http.get(url, {headers: this._headers});
    }

    post = (data: any, path?: string): Observable<OperationResult> => {
        const url = typeof path !== 'undefined' ? this.fullUrl() + path : this.fullUrl();
        return this.http.post(url, data, { headers: this._headers, observe: 'response' })
        .pipe(
            map(resp => this.extractOpsResultData(resp)),
            catchError(this.handleError),
        );
    }

    postById = (data: any, path?: string, id?: string): Observable<OperationResult> => {
        let url = typeof path !== 'undefined' ? this.fullUrl() + path + '/' : this.fullUrl();
        url = typeof id !== 'undefined' ? url + id : this.fullUrl();
        return this.http.post(url, data, { headers: this._headers, observe: 'response' })
        .pipe(
            map(resp => this.extractOpsResultData(resp)),
            catchError(this.handleError),
        );
    }

    put = (data: any, id?: string): Observable<OperationResult> => {
        const url = typeof id !== 'undefined' ? this.fullUrl() + id : this.fullUrl();
        return this.http.put(url, data, { headers: this._headers, observe: 'response', params: data.id })
            .pipe(
                map(resp => this.extractOpsResultData(resp)),
                catchError(this.handleError),
        );
    }

    put2 = (path: string, id: string): Observable<OperationResult> => {
        const url = this.fullUrl() + path + id;
        return this.http.put(url, null, { headers: this._headers, observe: 'response'})
            .pipe(
                map(resp => this.extractOpsResultData(resp)),
                catchError(this.handleError),
            );
    }

    delete = (id: number): Observable<Response> => {
        return this.http.delete<Response>(this.fullUrl() + id.toString());
    }

    deleteResource = (resource: string): Observable<Response> => {
        return this.http.delete<Response>(resource);
    }

    protected extractOpsResultData(res: HttpResponse<object>) {
        return new OperationResult(res.ok, res.statusText, res.url);
    }

    protected extractResultBodyData(res: HttpResponse<object>) {
        return new OpsBodyResponse(res.ok, res.statusText, res.url, res.status, res.body);
    }

    protected handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg: string = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return throwError(errMsg);
    }

    protected handleErrorWithMessage(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg: string = (error.message) ? error.error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg); // log to console instead
            return throwError(errMsg);
    }
}
