import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {Views} from '../../../configuration/interfaces/schema';
import {AuthenticationModule} from '../../authentication.module';

@Injectable({
    providedIn: AuthenticationModule
})
export class AuthenticationGuardService implements CanActivate {

    public static readonly LOGIN_COMPONENT = 'login';

    private readonly _loginUrl: string;

    constructor(private _auth: AuthenticationService,
                private _config: ConfigurationService,
                private _router: Router) {
        this._loginUrl = '/' + this.resolveLoginPath(this._config.get().views, AuthenticationGuardService.LOGIN_COMPONENT);
    }


    resolveLoginPath(views: Views, searchedLayout: string): string {
        if (!views || Object.keys(views).length === 0) {
            return null;
        }
        const route = Object.keys(views).find(routeKey => {
            const layout = views[routeKey].layout;
            return layout.name === searchedLayout;
        });
        if (route) {
            return route;
        }
        for (const routeKey of Object.keys(views)) {
            const resolved = this.resolveLoginPath(views[routeKey].children, searchedLayout);
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
