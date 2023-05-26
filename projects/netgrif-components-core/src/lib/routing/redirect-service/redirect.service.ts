import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router, UrlSegment} from '@angular/router';
import {LoggerService} from '../../logger/services/logger.service';
import {Views} from '../../../commons/schema';
import {ConfigurationService} from '../../configuration/configuration.service';

@Injectable({
    providedIn: 'root'
})
export class RedirectService {

    public static readonly LOGIN_COMPONENT = 'login';
    protected _lastIntendedRoute: ActivatedRouteSnapshot;
    private lastQueryParams: Params;

    constructor(protected _router: Router,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _route: ActivatedRoute) {
        this._route.queryParams.subscribe(params => this.lastQueryParams = params);
    }

    get lastUrl(): Array<UrlSegment> {
        return this._lastIntendedRoute.url;
    }

    set intendedRoute(route: ActivatedRouteSnapshot) {
        this._lastIntendedRoute = route;
    }

    get queryParams(): Params {
        return this.lastQueryParams;
    }

    public redirect(path?: string) {
        if (!!path) {
            this._router.navigateByUrl(path).then(log => {
                this._log.info('Router navigate to path ' + path + ' : ' + log);
            });
        } else if (this._lastIntendedRoute && (this._lastIntendedRoute as any)._routerState
            && (this._lastIntendedRoute as any)._routerState.url) {
            this._router.navigateByUrl((this._lastIntendedRoute as any)._routerState.url).then(log => {
                this._log.info('Router navigate to last path : ' + log);
            });
        }
    }

    public redirectFromUrl() {
        this.lastQueryParams = this._route.snapshot.queryParams;
        this._router.navigate([this.parseRedirectPath(this._router.url)], { queryParams: this.lastQueryParams });
    }

    public resolveLoginPath(): string {
        const config = this._config.get();
        if (this._config.getToLoginPath()) {
            return this._config.getToLoginPath();
        }
        const route = this.resolveLoginPathFromViewConfiguration(config.views, RedirectService.LOGIN_COMPONENT);
        if (route !== null) {
            return route;
        }
        throw new Error('No login view found in application. Authentication guard can\'t redirect. Add a view with'
            + ' layout.name="login" to your application, or set the desired redirect path in \'services.auth.toLoginRedirect\'');
    }

    protected resolveLoginPathFromViewConfiguration(views: Views, searchedLayout: string): string {
        if (!views || Object.keys(views).length === 0) {
            return null;
        }
        const route = Object.keys(views).find(routeKey => {
            const layout = views[routeKey].layout;
            return !!layout && layout.name === searchedLayout;
        });
        if (route) {
            return (views[route].routing && views[route].routing.path) ? views[route].routing.path : null;
        }
        for (const routeKey of Object.keys(views)) {
            const resolved = this.resolveLoginPathFromViewConfiguration(views[routeKey].children, searchedLayout);
            if (resolved && views[routeKey].routing && views[routeKey].routing.path) {
                return views[routeKey].routing.path + '/' + resolved;
            }
        }
        return null;
    }

    public parseRedirectPath(url: string): string {
        let path: string;
        if (url.includes('?')) {
            path = url.slice(0, url.indexOf('?'));
        } else {
            path = url;
        }
        return path.replace('/redirect', '');
    }
}
