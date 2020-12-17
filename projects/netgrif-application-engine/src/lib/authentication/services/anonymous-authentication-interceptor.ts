import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AnonymousAuthenticationInterceptor implements HttpInterceptor {
    private JWT_AUTH_TOKEN = 'Jwt-Auth-Token';

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtAuthToken = localStorage.getItem(this.JWT_AUTH_TOKEN);

        if (jwtAuthToken !== undefined && jwtAuthToken !== null && jwtAuthToken !== '') {
            req = req.clone({
                headers: req.headers.set(this.JWT_AUTH_TOKEN, jwtAuthToken)
            });
        } else {
            return next.handle(req);
        }
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.headers.has(this.JWT_AUTH_TOKEN)) {
                        localStorage.setItem(this.JWT_AUTH_TOKEN, event.headers.get(this.JWT_AUTH_TOKEN));
                    }
                }
            }),
            catchError(errorEvent => {
                if (errorEvent instanceof HttpErrorResponse && errorEvent.status === 401) {
                    console.debug('Authentication token is invalid. Clearing session token');
                    localStorage.removeItem(this.JWT_AUTH_TOKEN);
                }
                return throwError(errorEvent);
            })
        );
    }
}
