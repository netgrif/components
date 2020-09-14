import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../../user/services/user.service';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {RedirectService} from '../../routing/redirect-service/redirect.service';
import {ConfigurationService} from '../../configuration/configuration.service';

@Injectable({
    providedIn: AuthenticationModule
})
export class AuthorityGuardService implements CanActivate {

    private readonly _loginUrl: string;

    constructor(protected _redirectService: RedirectService,
                protected _userService: UserService,
                protected _configService: ConfigurationService,
                protected _router: Router) {
        this._loginUrl = this._redirectService.resolveLoginPath();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        this._redirectService.intendedRoute = route;
        const view = this._configService.getViewByUrl(state.url.toString());
        if (typeof view.access !== 'string' && view.access.hasOwnProperty('authority')) {
            return this._userService.hasAuthority(view.access.authority);
        }
    }
}
