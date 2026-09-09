import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {SessionService} from '../session/services/session.service';
import {RedirectService} from '../../routing/redirect-service/redirect.service';
// import {AnonymousService} from '../anonymous/anonymous.service';
import {SessionIdleTimerService} from "../session/services/session-idle-timer.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private _session: SessionService,
                private _redirect: RedirectService,
                // private _anonymousService: AnonymousService,
                private idleTimerService: SessionIdleTimerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this._session) {
            return next.handle(req);
        }

        const sessionHeader = this._session.sessionHeader;
        const sessionToken = req.headers.get(sessionHeader) || this._session.sessionToken || '';
        if (sessionToken && !req.headers.has('Authorization') && !req.headers.has(sessionHeader)) {
            req = req.clone({
                headers: req.headers.set(sessionHeader, sessionToken)
            });
            this.idleTimerService.resetTimer();
        }
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse && (this._session.sessionToken || '') === sessionToken) {
                    const responseToken = event.headers.get(sessionHeader);
                    if (responseToken) {
                        this._session.setVerifiedToken(responseToken);
                    }
                }
            }),
            catchError(errorEvent => {
                if (errorEvent instanceof HttpErrorResponse && errorEvent.status === 401
                    && (this._session.sessionToken || '') === sessionToken) {
                    console.debug('Authentication token is invalid. Clearing session token');
                    this._session.clear();
                    if (this._session.isInitialized && !req.headers.has('Authorization')) {
                        this._redirect.redirect(this._redirect.resolveLoginPath());
                    }
                }
                return throwError(errorEvent);
            })
        );
    }
}
