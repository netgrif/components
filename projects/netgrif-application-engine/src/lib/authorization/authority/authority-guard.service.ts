import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../../user/services/user.service';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {RedirectService} from '../../routing/redirect-service/redirect.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Observable} from 'rxjs';
import {View} from '../../../commons/schema';

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

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this._redirectService.intendedRoute = route;
        const view = this._configService.getViewByUrl(state.url.toString());
        return this.canAccessView(view);
    }

    public canAccessView(view: View): boolean {
        if (typeof view.access !== 'string' && view.access.hasOwnProperty('authority')) {
            return this._userService.hasAuthority(view.access.authority);
        }
    }
}
