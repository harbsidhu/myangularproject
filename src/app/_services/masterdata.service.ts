import { Injectable } from '@angular/core';
import { ApiCallService } from './apiCall.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoOfEmployees } from '../_models/masterData';

@Injectable()
export class MasterdataService extends ApiCallService {
    constructor(public http: HttpClient) {
        super(http);
        this.set('/api/masterdata/');
      }

      getNoOfemployees(): Observable<Array<NoOfEmployees>> {
        return this.getUrl('noofemployees');
      }

      getCouncils(): Observable<any> {
        return this.getUrl('councils');
      }

      getDivisions(): Observable<any> {
        return this.getUrl('divisions');
      }

      getSubdivisions(id: string): Observable<any> {
        return this.getUrl('subdivisions/' + id);
      }

      getAttributes(id: string): Observable<any> {
        return this.getUrl('attributes/' + id);
      }

      getUnits(id: string): Observable<any> {
        return this.getUrl('units/' + id);
      }

      getFrequencies(): Observable<any> {
        return this.getUrl('frequencies');
      }

      getResourceListTypes(): Observable<any> {
        return this.getUrl('resourcelisttypes');
      }
}
