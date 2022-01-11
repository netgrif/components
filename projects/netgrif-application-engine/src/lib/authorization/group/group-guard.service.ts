import {Injectable} from '@angular/core';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {RedirectService} from '../../routing/redirect-service/redirect.service';
import {UserService} from '../../user/services/user.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {LoggerService} from '../../logger/services/logger.service';
import {View} from '../../../commons/schema';
import {NextGroupService} from '../../groups/services/next-group.service';

@Injectable({
        providedIn: AuthenticationModule
})
export class GroupGuardService implements CanActivate {

    private readonly _loginUrl: string;

    constructor(protected _redirectService: RedirectService,
                protected _userService: UserService,
                protected _nextGroupService: NextGroupService,
                protected _configService: ConfigurationService,
                protected _log: LoggerService) {
        this._loginUrl = this._redirectService.resolveLoginPath();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this._redirectService.intendedRoute = route;
        const view = this._configService.getViewByUrl(state.url.toString());
        return this.canAccessView(view, state.url.toString());
    }

    public canAccessView(view: View, url: string): boolean {
        if (typeof view.access !== 'string' && view.access.hasOwnProperty('group')) {
            let allowedGroups: Array<string>;
            if (Array.isArray(view.access.group)) {
                allowedGroups = view.access.group;
            } else {
                allowedGroups = [view.access.group];
            }
            const groupOfUser = this._nextGroupService.groupOfUser.map(group => group.title);

            return allowedGroups.some(groupTitle => {
                return groupOfUser.includes(groupTitle);
            });
        }
        throw new Error('Group guard is declared for a view with no group guard configuration!'
            + ` Add group guard configuration for view at ${url}, or remove the guard.`);
    }
}
