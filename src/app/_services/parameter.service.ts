import { Injectable } from '@angular/core';


// Parameter Service to pass parameter to other component on routing wthout showing them in route as paremeter
@Injectable()
export class ParameterService {

   _queryParam: string;

   set queryParam(value: string) {
      this._queryParam = value;
   }

   get queryParam(): string {
       return this._queryParam;
   }

   constructor() {}

}