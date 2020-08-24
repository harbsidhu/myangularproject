import { ApiCallService } from './apiCall.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ResourceService extends ApiCallService {

    constructor(public http: HttpClient) {
        super(http);
        this.set('/api/resource/');
    }

    getResourcesByCommodity(id: number): Observable<any> {
       return this.getDetail(id);
    }

    getResources(): Observable<any> {
        return this.get();
     }

     postResourcesByCompany(id: string, data: any): Observable<any> {
        return this.postById(data, 'resourceCompany', id);
     }

     getResourcesByCompany(id: number): Observable<any> {
      return this.getDetail(id, 'company');
   }

   getResourcesForSearch(): Observable<any> {
      return this.getUrl('forsearch');
   }

   getCommodities(): Observable<any> {
      return this.getUrl('commodities');
   }
}
