import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticationModule} from '../../authentication.module';
import {SessionService} from '../../session/services/session.service';
import {RedirectService} from '../../../routing/redirect-service/redirect.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {UserService} from '../../../user/services/user.service';
import {isObservable, Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, take} from 'rxjs/operators';
import {ApiTokenAuthentication} from '../../../../commons/schema';

@Injectable({
    providedIn: AuthenticationModule
})
export class AuthenticationGuardService implements CanActivate {

    private readonly _loginUrl: string;

    constructor(private _session: SessionService,
                private _redirectService: RedirectService,
                private _configuration: ConfigurationService,
                private _userService: UserService,
                private _router: Router) {
        this._loginUrl = this._redirectService.resolveLoginPath();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
        this._redirectService.intendedRoute = route;
        if (this._session.isInitialized) {
            return this.authorize(route, state);
        }
        return this._session.initializing.pipe(
            filter(initialized => initialized),
            take(1),
            switchMap(() => {
                const decision = this.authorize(route, state);
                return isObservable(decision) ? decision : of(decision);
            })
        );
    }

    private authorize(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
        const config = this.apiTokenConfiguration();
        const tokenParameter = config?.queryParameter || 'token';
        const realmParameter = config?.realmQueryParameter || 'realmId';
        const token = route.queryParamMap.get(tokenParameter)?.trim();

        if (this._session.sessionToken && this._session.verified) {
            return config?.enabled && token && config.removeFromUrl !== false
                ? this.sanitizedUrl(state.url, tokenParameter, realmParameter)
                : true;
        }
        if (!config?.enabled || !token || !this.isAllowedPath(state.url, config.allowedPaths)) {
            return this._router.parseUrl(this._loginUrl);
        }

        const realmId = route.queryParamMap.get(realmParameter)?.trim();
        return this._userService.loginWithApiToken(token, realmId).pipe(
            take(1),
            map(user => {
                if (!user || !this._session.sessionToken || !this._session.verified) {
                    return this._router.parseUrl(this._loginUrl);
                }
                return config.removeFromUrl === false
                    ? true
                    : this.sanitizedUrl(state.url, tokenParameter, realmParameter);
            }),
            catchError(() => of(this._router.parseUrl(this._loginUrl)))
        );
    }

    private apiTokenConfiguration(): ApiTokenAuthentication | undefined {
        return this._configuration.get().providers.auth.apiToken;
    }

    private isAllowedPath(url: string, allowedPaths: Array<string> | undefined): boolean {
        if (!allowedPaths?.length) {
            return false;
        }
        const path = this._router.parseUrl(url).root.children['primary']?.segments
            .map(segment => segment.path)
            .join('/') || '';
        const normalizedPath = `/${path}`.replace(/\/$/, '') || '/';
        return allowedPaths.some(allowedPath => {
            const normalizedAllowedPath = `/${allowedPath}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
            if (normalizedAllowedPath.endsWith('/**')) {
                const prefix = normalizedAllowedPath.slice(0, -3);
                return normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`);
            }
            return normalizedPath === normalizedAllowedPath;
        });
    }

    private sanitizedUrl(url: string, tokenParameter: string, realmParameter: string): UrlTree {
        const tree = this._router.parseUrl(url);
        delete tree.queryParams[tokenParameter];
        delete tree.queryParams[realmParameter];
        return tree;
    }
}
