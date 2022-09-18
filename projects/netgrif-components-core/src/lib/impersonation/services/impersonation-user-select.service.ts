import {Inject, Injectable, Optional} from '@angular/core';
import {ImpersonationService} from "./impersonation.service";
import {NAE_USER_IMPERSONATE_COMPONENT, NAE_ADMIN_IMPERSONATE_COMPONENT} from '../../side-menu/content-components/injection-tokens';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {UserImpersonateConfigMetadata} from '../models/user-impersonate-config-metadata';
import {
    UserImpersonateInjectionData
} from '../../side-menu/content-components/user-impersonate/model/user-impersonate-injection-data';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {UserImpersonationConstants} from '../models/user-impersonation-constants';
import moment from 'moment';
import {UserService} from '../../user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ImpersonationUserSelectService {

    constructor(protected _log: LoggerService,
                protected _sideMenuService: SideMenuService,
                protected _snackBar: SnackBarService,
                protected _impersonation: ImpersonationService,
                protected _user: UserService,
                @Optional() @Inject(NAE_USER_IMPERSONATE_COMPONENT) protected _userImpersonateComponent: any,
                @Optional() @Inject(NAE_ADMIN_IMPERSONATE_COMPONENT) protected _adminImpersonateComponent: any,
    ) {}

    /**
     * Opens side menu with users who can be impersonated by logged user
     */
    public selectImpersonate(): void {
        if (this.isAdmin()) {
            this._sideMenuService.open(this._adminImpersonateComponent, SideMenuSize.LARGE, this.injectedData()).onClose.subscribe(event => {
                this._log.debug('Impersonable user select :' + event);
                if (event.data === undefined) {
                    return;
                }
                this._impersonation.impersonateUser(event.data._id);
            });
        } else {
            this._sideMenuService.open(this._userImpersonateComponent, SideMenuSize.LARGE, this.injectedData()).onClose.subscribe(event => {
                this._log.debug('Impersonable config select :' + event);
                if (event.data === undefined) {
                    return;
                }
                this._impersonation.impersonateByConfig((event.data as UserImpersonateConfigMetadata).stringId);
            });
        }
    }

    protected injectedData(): UserImpersonateInjectionData {
        const currentTime = moment();
        let filterCasesFilter = SimpleFilter.fromCaseQuery({
            process: {
                identifier: UserImpersonationConstants.IMPERSONATION_CONFIG_NET_IDENTIFIER
            },
            query: `
            (dataSet.impersonators.keyValue:${this._user.user.id}) AND
            (dataSet.is_active.booleanValue:true) AND
            ((!(_exists_:dataSet.valid_from.timestampValue)) OR (dataSet.valid_from.timestampValue:< ${currentTime.valueOf()})) AND
            ((!(_exists_:dataSet.valid_to.timestampValue)) OR (dataSet.valid_to.timestampValue:>${currentTime.valueOf()}))
            `
        });
        return {
            filter: filterCasesFilter
        } as UserImpersonateInjectionData
    }

    protected isAdmin(): boolean {
        return this._user.hasAuthority('ROLE_ADMIN');
    }

}
