import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticationModule} from '../../authentication.module';
import {SessionService} from '../../session/services/session.service';
import {RedirectService} from '../../../routing/redirect-service/redirect.service';

@Injectable({
    providedIn: AuthenticationModule
})
export class AuthenticationGuardService implements CanActivate {

    private readonly _loginUrl: string;

    constructor(private _session: SessionService,
                private _redirectService: RedirectService,
                private _router: Router) {
        this._loginUrl = this._redirectService.resolveLoginPath();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        this._redirectService.intendedRoute = route;
        return this._session.sessionToken && this._session.verified ? true : this._router.parseUrl(this._loginUrl);
    }
}
