import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AnonymousService} from '../anonymous/anonymous.service';

@Injectable()
export class AnonymousAuthenticationInterceptor implements HttpInterceptor {

    constructor(protected _anonymousService: AnonymousService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const xAnonymousToken = this._anonymousService.getToken();

        if (!this._anonymousService) {
            next.handle(req);
        }

        if (!!xAnonymousToken) {
            req = req.clone({
                headers: req.headers.set(this._anonymousService.anonymousTokenHeader, xAnonymousToken)
            });
        }
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.headers.has(this._anonymousService.anonymousTokenHeader)) {
                        this._anonymousService.setToken(event.headers.get(this._anonymousService.anonymousTokenHeader));
                    }
                }
            }),
            catchError(errorEvent => {
                if (errorEvent instanceof HttpErrorResponse && errorEvent.status === 401) {
                    console.debug('Authentication token is invalid. Clearing session token');
                    this._anonymousService.removeToken();
                }
                return throwError(errorEvent);
            })
        );
    }
}
