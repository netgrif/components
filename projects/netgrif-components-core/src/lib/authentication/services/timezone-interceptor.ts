import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TimezoneInterceptor implements HttpInterceptor {

    private readonly TIMEZONE_OFFSET_HEADER_NAME = 'X-Timezone-Offset'

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            headers: req.headers.set(this.TIMEZONE_OFFSET_HEADER_NAME, this.getTimeZoneOffset())
        });
        return next.handle(req)
    }

    private getTimeZoneOffset(): string {
        return (new Date()).getTimezoneOffset().toString();
    }

}
