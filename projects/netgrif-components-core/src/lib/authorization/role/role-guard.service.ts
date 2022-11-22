import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../../user/services/user.service';
import {AuthenticationModule} from '../../authentication/authentication.module';
import {RedirectService} from '../../routing/redirect-service/redirect.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Access, RoleAccess, View} from '../../../commons/schema';
import {LoggerService} from '../../logger/services/logger.service';
import {Observable} from 'rxjs';


interface RoleConstraint {
    processIdentifier: string;
    roleIdentifier?: string;
    roleName?: string;
}

@Injectable({
    providedIn: AuthenticationModule
})
export class RoleGuardService implements CanActivate {

    private readonly _loginUrl: string;

    constructor(protected _redirectService: RedirectService,
                protected _userService: UserService,
                protected _configService: ConfigurationService,
                protected _log: LoggerService) {
        this._loginUrl = this._redirectService.resolveLoginPath();
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this._redirectService.intendedRoute = route;
        const view = this._configService.getViewByUrl(state.url.toString());
        return this.canAccessView(view, state.url.toString());
    }

    public canAccessView(view: View, url: string): boolean {
        if (typeof view.access !== 'string' && (view.access.hasOwnProperty('role') || view.access.hasOwnProperty('bannedRole'))) {

            if (view.access.hasOwnProperty('role') && view.access.hasOwnProperty('bannedRole')) {
                const bannedRoles = this.parseRoleConstraints(view.access.bannedRole, url);
                const allowedRoles = this.parseRoleConstraints(view.access.role, url);

                if (bannedRoles.some(role => this.decideAccessByRole(role))) {
                    return false;
                }

                if (allowedRoles.length === 0) {
                    this._log.warn(`View at '${url}' defines role access constraint with an empty array!`
                        + ` No users will be allowed to enter this view!`);
                }
                return allowedRoles.some(role => this.decideAccessByRole(role)); // user was not denied access by a banned role, they need at least one allowed role
            }

            if (view.access.hasOwnProperty('bannedRole')) {
                const bannedRoles = this.parseRoleConstraints(view.access.bannedRole, url);
                return !bannedRoles.some(constraint => {
                    return this.decideAccessByRole(constraint);
                });
            }

            if (view.access.hasOwnProperty('role')) {
                const allowedRoles = this.parseRoleConstraints(view.access.role, url);
                if (allowedRoles.length === 0) {
                    this._log.warn(`View at '${url}' defines role access constraint with an empty array!`
                        + ` No users will be allowed to enter this view!`);
                }
                return allowedRoles.some(constraint => {
                    return this.decideAccessByRole(constraint);
                });
            }
        }
        throw new Error('Role guard is declared for a view with no role guard configuration!'
            + ` Add role guard configuration for view at ${url}, or remove the guard.`);
    }

    protected parseRoleConstraints(roleConstrains: Access['role'] | Access['bannedRole'], viewUrl: string): Array<RoleConstraint> {
        if (typeof roleConstrains === 'string') {
            return this.parseStringRoleConstraints(roleConstrains);
        }
        if (Array.isArray(roleConstrains)) {
            if (roleConstrains.length === 0) {
                return [];
            }
            if (typeof roleConstrains[0] === 'string') {
                return this.parseStringRoleConstraints(roleConstrains as Array<string>);
            }
        }
        return this.parseObjectRoleConstrains(roleConstrains as RoleAccess | Array<RoleAccess>);
    }

    /**
     * @deprecated in 5.0.0
     */
    protected parseStringRoleConstraints(roleConstrains: string | Array<string>): Array<RoleConstraint> {
        if (!Array.isArray(roleConstrains)) {
            roleConstrains = [roleConstrains];
        }

        this._log.warn('Using string role guard configuration is deprecated! Migrate to object based configuration instead.');

        return roleConstrains.map(constraint => {
            const splitRoleArray = constraint.split('.');
            if (splitRoleArray.length === 2) {
                return {processIdentifier: splitRoleArray[0], roleName: splitRoleArray[1]};
            } else {
                throw new Error('Please enter the correct format <net import id>.<role name>');
            }
        });
    }

    protected parseObjectRoleConstrains(roleConstrains: RoleAccess | Array<RoleAccess>): Array<RoleConstraint> {
        if (!Array.isArray(roleConstrains)) {
            roleConstrains = [roleConstrains];
        }

        return roleConstrains.map(constraint => {
            if (!constraint.roleId || !constraint.processId) {
                throw new Error('Please enter both process and role id for a role constraint: ' + constraint);
            }
            return {processIdentifier: constraint.processId, roleIdentifier: constraint.roleId};
        });
    }

    private decideAccessByRole(constraint: RoleConstraint): boolean {
        if (constraint.roleIdentifier) {
            return this._userService.hasRoleByIdentifier(constraint.roleIdentifier, constraint.processIdentifier);
        } else {
            return this._userService.hasRoleByName(constraint.roleName, constraint.processIdentifier);
        }
    }

}
