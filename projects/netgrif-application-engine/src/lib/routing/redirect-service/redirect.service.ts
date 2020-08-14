import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, UrlSegment} from '@angular/router';
import {LoggerService} from '../../logger/services/logger.service';
import {Views} from '../../configuration/interfaces/schema';
import {ConfigurationService} from '../../configuration/configuration.service';

@Injectable({
    providedIn: 'root'
})
export class RedirectService {

    public static readonly LOGIN_COMPONENT = 'login';
    protected _lastIntendedRoute: ActivatedRouteSnapshot;

    constructor(protected _router: Router,
                protected _log: LoggerService,
                protected _config: ConfigurationService) {
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
        } else if (this._lastIntendedRoute && this._lastIntendedRoute.url[0]) {
            this._router.navigateByUrl(this._lastIntendedRoute.url[0].path).then(log => {
                this._log.info('Router navigate to last path : ' + log);
            });
        }
    }

    public resolveLoginPath(): string {
        const config = this._config.get();
        if (!!config.services && !!config.services.auth && !!config.services.auth.loginRedirect) {
            return config.services.auth.loginRedirect;
        }
        const route = this.resolveLoginPathFromViewConfiguration(
            this._config.get().views, RedirectService.LOGIN_COMPONENT);
        if (route !== null) {
            return route;
        }
        throw new Error('No login view found in application. Authentication guard can\'t redirect. Add a view with'
            + ' layout.name="login" to your application, or set the desired redirect path in \'services.auth.loginRedirect\'');
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
}
