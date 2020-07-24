import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {LanguageService} from './language.service';

@Injectable()
export class TranslateInterceptor implements HttpInterceptor {

    constructor(private _select: LanguageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            headers: req.headers.set('Accept-Language', this._select.getLanguage())
        });
        return next.handle(req);
    }
}

