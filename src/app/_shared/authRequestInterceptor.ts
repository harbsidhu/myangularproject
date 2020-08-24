import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_NAME } from '../_services/auth.service';
import { Observable } from 'rxjs';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const token = localStorage.getItem(TOKEN_NAME);
        // Clone the request to add the new header.
        if (token) {
            const authReq =
              req.clone(
              {
                headers: req.headers.set(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token.substring(1).slice(0, -1)}`),
              });
            return next.handle(authReq);
        }
        // Pass on the cloned request instead of the original request.
        return next.handle(req);
    }
}
