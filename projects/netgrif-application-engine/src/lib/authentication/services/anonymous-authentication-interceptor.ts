import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AnonymousService} from '../anonymous/anonymous.service';

@Injectable()
export class AnonymousAuthenticationInterceptor implements HttpInterceptor {

    constructor(protected _anonymousService: AnonymousService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtAuthToken = this._anonymousService.getToken();

        if (!this._anonymousService) {
            next.handle(req);
        }

        if (!!jwtAuthToken) {
            req = req.clone({
                headers: req.headers.set(this._anonymousService.jwtHeader, jwtAuthToken)
            });
        }
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    const token = event.headers.get(this._anonymousService.jwtHeader);
                    if (token !== null) {
                        this._anonymousService.setToken(token);
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
