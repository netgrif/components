import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SelectLanguageService} from '../toolbar/select-language.service';

@Injectable()
export class TranslateInterceptor implements HttpInterceptor {

    constructor(private _select: SelectLanguageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            headers: req.headers.set('Accept-Language', this._select.getLanguage())
        });
        return next.handle(req);
    }
}

