import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { ApiCallService } from './apiCall.service';
import { AuthUser } from '../_models/authUser';
import { map, catchError } from 'rxjs/operators';

export const TOKEN_NAME: string = 'jwt';

@Injectable()
export class AuthService extends ApiCallService {

    constructor(public http: HttpClient) {
        super(http);
        this.set('/api/auth/');
    }

    getToken(): string {
        return localStorage.getItem(TOKEN_NAME);
    }

    clearToken() {
        localStorage.removeItem(TOKEN_NAME);
    }

    setToken(token: string): void {
        localStorage.setItem(TOKEN_NAME, token);
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) token = this.getToken();
        if (!token) return true;

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    public login(authUSer: AuthUser) {
        const credentials = JSON.stringify(authUSer);
        return this.http.post(this.fullUrl() + 'login', credentials, { headers: this._headers, observe: 'response' })
        .pipe(
            map(resp => this.extractResultBodyData(resp)),
            catchError(this.handleError),
        );
    }

    changePasswordWithToken(token: string, password: string ) {
        const data = {token: token, password: password};
        return this.post(data, 'changepasstoken' );
    }

    changePassword(id: number, password: string ) {
        const data = {id: id, password: password};
        return this.post(data, 'changepass' );
    }

    recoverPassword(email: string) {
        return this.getUrl('recoverPassword/' + email);
    }
}
