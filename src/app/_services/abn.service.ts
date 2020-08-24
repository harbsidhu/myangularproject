import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AbnService {
    public _baseUrl: string;
    public _apiUrl: string;
    public _apiKey: string = '62312141-3e0c-45e6-92f2-f94ab226c2a2';
    // tslint:disable-next-line: max-line-length
    public testURL: string = 'https://abr.business.gov.au/abrxmlsearch/AbrXmlSearch.asmx/SearchByABNv201408?searchString=54+637+633+277&includeHistoricalDetails=N&authenticationGuid=62312141-3e0c-45e6-92f2-f94ab226c2a2';

    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        }),
    };

    constructor(public http: HttpClient) {
        this._baseUrl = environment.abn_api_url;
    }
    public fullUrl = (abn: string) => {
        this._apiUrl = this._baseUrl + '?callback=abnCallback&abn=' + abn + '&guid=' + this._apiKey;
    }

    get = (): Observable<any> => {
        return this.http.get<any>(this.testURL, this.httpOptions);
    }
}
