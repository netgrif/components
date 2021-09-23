import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {SessionService} from '../session/services/session.service';
import {RedirectService} from '../../routing/redirect-service/redirect.service';
import {AnonymousService} from '../anonymous/anonymous.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private _session: SessionService, private _redirect: RedirectService, private _anonymousService: AnonymousService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this._session) {
            return next.handle(req);
        }

        if (this._session && !!this._session.sessionToken) {
            req = req.clone({
                headers: req.headers.set(this._session.sessionHeader, this._session.sessionToken)
            });
        }
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    const header = event.headers.get(this._session.sessionHeader);
                    if (header !== null && !event.headers.has(this._anonymousService.jwtHeader)) {
                        this._session.setVerifiedToken(header);
                    }
                }
            }),
            catchError(errorEvent => {
                if (errorEvent instanceof HttpErrorResponse && errorEvent.status === 401) {
                    console.debug('Authentication token is invalid. Clearing session token');
                    this._session.clear();
                    this._redirect.redirect(this._redirect.resolveLoginPath());
                }
                return throwError(errorEvent);
            })
        );
    }
}
