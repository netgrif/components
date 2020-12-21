import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AnonymousService} from '../anonymous/anonymous.service';

@Injectable()
export class AnonymousAuthenticationInterceptor implements HttpInterceptor {

    constructor(protected _anonymousService: AnonymousService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtAuthToken = localStorage.getItem(this._anonymousService.jwtHeader);

        if (!this._anonymousService) {
            next.handle(req);
        }

        if (jwtAuthToken !== undefined && jwtAuthToken !== null && jwtAuthToken !== '') {
            req = req.clone({
                headers: req.headers.set(this._anonymousService.jwtHeader, jwtAuthToken)
            });
        }
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.headers.has(this._anonymousService.jwtHeader)) {
                        localStorage.setItem(this._anonymousService.jwtHeader, event.headers.get(this._anonymousService.jwtHeader));
                    }
                }
            }),
            catchError(errorEvent => {
                if (errorEvent instanceof HttpErrorResponse && errorEvent.status === 401) {
                    console.debug('Authentication token is invalid. Clearing session token');
                    localStorage.removeItem(this._anonymousService.jwtHeader);
                }
                return throwError(errorEvent);
            })
        );
    }
}
