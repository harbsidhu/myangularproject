import { Injectable } from '@angular/core';
import { AuthUser } from '../_models/authUser';
import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './apiCall.service';
import { map, catchError } from 'rxjs/operators';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthCallService extends ApiCallService {

    constructor(public http: HttpClient) {
        super(http);
        this.set('/api/auth/');
    }

    public login(authUSer: AuthUser) {
        const credentials = JSON.stringify(authUSer);
        return this.http.post(this.fullUrl() + 'login', credentials, { headers: this._headers, observe: 'response' })
        .pipe(
            map(resp => this.extractResultBodyData(resp)),
            catchError(this.handleError),
        );
    }
}
