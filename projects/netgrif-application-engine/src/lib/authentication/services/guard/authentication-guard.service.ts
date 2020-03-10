import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {Route} from '../../../configuration/interfaces/schema';

@Injectable()
export class AuthenticationGuardService implements CanActivate {

    public static readonly LOGIN_COMPONENT = 'loginview';

    private readonly _loginUrl: string;

    constructor(private _auth: AuthenticationService,
                private _config: ConfigurationService,
                private _router: Router) {
        this._loginUrl = '/' + this.resolveLoginPath(this._config.get().views.routes, AuthenticationGuardService.LOGIN_COMPONENT);
    }


    resolveLoginPath(routes: {}, searchedLayout: string): string {
        if (!routes || Object.keys(routes).length === 0) {
            return null;
        }
        const route = Object.keys(routes).find(routeKey => {
            const layout = (routes[routeKey] as Route).layout;
            return layout.name === searchedLayout;
        });
        if (route) {
            return route;
        }
        for (const routeKey of Object.keys(routes)) {
            const resolved = this.resolveLoginPath((routes[routeKey] as Route).routes, searchedLayout);
            if (resolved) {
                return routeKey + '/' + resolved;
            }
        }
        return null;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (!this._auth.isAuthenticated()) {
            return this._router.parseUrl(this._loginUrl);
        }
        return this._auth.isAuthenticated();
    }
}
