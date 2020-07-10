import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, UrlSegment} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RedirectService {

    private _lastIntendedRoute: ActivatedRouteSnapshot;

    constructor(private _router: Router) {
    }

    get lastUrl(): Array<UrlSegment> {
        return this._lastIntendedRoute.url;
    }

    set intendedRoute(route: ActivatedRouteSnapshot) {
        this._lastIntendedRoute = route;
    }

    public redirect(path?: string) {
        if (!!path) {
            this._router.navigate([path]);
        } else if (this._lastIntendedRoute) {
            this._router.navigate(this._lastIntendedRoute.url);
        }
    }
}
