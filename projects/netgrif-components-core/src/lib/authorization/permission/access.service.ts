import {Injectable} from '@angular/core';
import {RoleGuardService} from "../role/role-guard.service";
import {AuthorityGuardService} from "../authority/authority-guard.service";
import {GroupGuardService} from "../group/group-guard.service";
import {ConfigurationService} from "../../configuration/configuration.service";
import {View} from "../../../commons/schema";
import {UserService} from '../../user/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AccessService {

    constructor(
        private _config: ConfigurationService,
        private _userService: UserService,
        private _roleGuard: RoleGuardService,
        private _authorityGuard: AuthorityGuardService,
        private _groupGuard: GroupGuardService,
    ) {
    }

    /**
     * @param view the view whose access permissions we want to check
     * @param url URL to which the view maps. Is used only for error message generation
     * @returns whether the user can access the provided view
     */
    public canAccessView(view: View, url?: string): boolean {
        if (!view.hasOwnProperty('access')) {
            return true;
        }

        if (typeof view.access === 'string') {
            if (view.access === 'public') {
                return true;
            }
            if (view.access !== 'private') {
                throw new Error(`Unknown access option '${view.access}'. Only 'public' or 'private' is allowed.`);
            }
            return !this._userService.user.isEmpty();
        }

        if (!url) {
            url = view?.routing?.path;
        }

        return !this._userService.user.isEmpty() // AuthGuard
            && this.passesRoleGuard(view, url)
            && this.passesAuthorityGuard(view)
            && this.passesGroupGuard(view, url);
    }

    /**
     * @param view the view whose access permissions we want to check
     * @param url URL to which the view maps. Is used only for error message generation
     * @returns whether the user passes the role guard condition for accessing the specified view
     */
    public passesRoleGuard(view: View, url: string): boolean {
        return (!view.access.hasOwnProperty('role') && !view.access.hasOwnProperty('bannedRole')) || this._roleGuard.canAccessView(view, url);
    }

    /**
     * @param view the view whose access permissions we want to check
     * @returns whether the user passes the authority guard condition for accessing the specified view
     */
    public passesAuthorityGuard(view: View): boolean {
        return !view.access.hasOwnProperty('authority') || this._authorityGuard.canAccessView(view);
    }

    /**
     * @param view the view whose access permissions we want to check
     * @param url URL to which the view maps. Is used only for error message generation
     * @returns whether the user passes the role guard condition for accessing the specified view
     */
    public passesGroupGuard(view: View, url: string): boolean {
        return !view.access.hasOwnProperty('group') || this._groupGuard.canAccessView(view, url);
    }
}
