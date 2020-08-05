import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, UrlSegment} from '@angular/router';
import {LoggerService} from '../../logger/services/logger.service';

@Injectable({
    providedIn: 'root'
})
export class RedirectService {

    private _lastIntendedRoute: ActivatedRouteSnapshot;

    constructor(private _router: Router, private _log: LoggerService) {
    }

    get lastUrl(): Array<UrlSegment> {
        return this._lastIntendedRoute.url;
    }

    set intendedRoute(route: ActivatedRouteSnapshot) {
        this._lastIntendedRoute = route;
    }

    public redirect(path?: string) {
        if (!!path) {
            this._router.navigateByUrl(path).then(log => {
                this._log.info('Router navigate to path ' + path + ' : ' + log);
            });
        } else if (this._lastIntendedRoute) {
            this._router.navigateByUrl(this._lastIntendedRoute.url[0].path).then(log => {
                this._log.info('Router navigate to last path : ' + log);
            });
        }
    }
}
