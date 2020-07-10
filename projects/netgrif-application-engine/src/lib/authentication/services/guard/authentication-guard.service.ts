import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {ConfigurationService} from '../../../configuration/configuration.service';
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


    private resolveLoginPath(): string {
        const config = this._config.get();
        if (!!config.services && !!config.services.auth && !!config.services.auth.loginRedirect) {
            return config.services.auth.loginRedirect;
        }

        const route = this._config.getPathsByView(AuthenticationGuardService.LOGIN_COMPONENT);
        if (route === null || route.length === 0) {
            throw new Error('No login view found in application or no path configured as login. ' +
                'Authentication guard can\'t redirect. Add a view with layout.name="login" to your application, ' +
                'or set the desired redirect path in \'services.auth.loginRedirect\'');
        }
        return route[0];
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        this._redirectService.intendedRoute = route;
        return this._session.sessionToken && this._session.verified ? true : this._router.parseUrl(this._loginUrl);
    }
}
