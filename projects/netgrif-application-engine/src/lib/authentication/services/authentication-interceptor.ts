import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {SessionService} from '../session/services/session.service';
import {AuthenticationService} from './authentication/authentication.service';
import {AuthenticationModule} from '../authentication.module';

@Injectable({
    providedIn: AuthenticationModule
})
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private _session: SessionService, private _auth: AuthenticationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this._session.sessionToken) {
            req = req.clone({
                headers: req.headers.set(this._session.sessionHeader, this._session.sessionToken)
            });
        }
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.headers.has(this._session.sessionHeader)) {
                        this._session.sessionToken = event.headers.get(this._session.sessionHeader);
                    }
                }
            }),
            catchError(errorEvent => {
                if (errorEvent instanceof HttpErrorResponse && errorEvent.status === 401) {
                    console.debug('Authentication token is invalid. Clearing stream');
                    this._session.clear();
                    this._auth.authenticated$.next(false);
                }
                return throwError(errorEvent);
            })
        );
    }
}
