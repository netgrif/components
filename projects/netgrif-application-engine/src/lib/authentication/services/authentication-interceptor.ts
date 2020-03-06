import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BasicAuthenticationService} from '../basic-authentication/basic-authentication.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    private authService: BasicAuthenticationService;

    constructor(private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService = this.injector.get<BasicAuthenticationService>(BasicAuthenticationService);
        const token: string = this.authService.token;
        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
        return next.handle(req).pipe( // TODO refactor to separte interceptor
            catchError(response => {
                if (response instanceof HttpErrorResponse && response.status === 401) {
                    console.error(response);
                }
                return throwError(response);
            })
        );
    }
}
