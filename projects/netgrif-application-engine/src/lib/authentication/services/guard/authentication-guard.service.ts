import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {Views} from '../../../configuration/interfaces/schema';
import {AuthenticationModule} from '../../authentication.module';
import {SessionService} from '../../session/services/session.service';
import {RedirectService} from '../../../routing/redirect-service/redirect.service';

@Injectable({
    providedIn: AuthenticationModule
})
export class AuthenticationGuardService implements CanActivate {

    public static readonly LOGIN_COMPONENT = 'login';

    private readonly _loginUrl: string;

    constructor(private _session: SessionService,
                private _config: ConfigurationService,
                private _redirectService: RedirectService,
                private _router: Router) {
        this._loginUrl = this.resolveLoginPath();
    }


    resolveLoginPath(): string {
        const config = this._config.get();
        if (!!config.services && !!config.services.auth && !!config.services.auth.loginRedirect) {
            return config.services.auth.loginRedirect;
        }
        const route = this.resolveLoginPathFromViewConfiguration(
            this._config.get().views, AuthenticationGuardService.LOGIN_COMPONENT);
        if (route !== null) {
            return route;
        }
        throw new Error('No login view found in application. Authentication guard can\'t redirect. Add a view with'
            + ' layout.name="login" to your application, or set the desired redirect path in \'services.auth.loginRedirect\'');
    }

    private resolveLoginPathFromViewConfiguration(views: Views, searchedLayout: string): string {
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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        this._redirectService.intendedRoute = route;
        return this._session.sessionToken && this._session.verified ? true : this._router.parseUrl(this._loginUrl);
    }
}
