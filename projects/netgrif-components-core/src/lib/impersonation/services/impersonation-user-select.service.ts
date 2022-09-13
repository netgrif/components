import {Inject, Injectable, Optional} from '@angular/core';
import {ImpersonationService} from "./impersonation.service";
import {NAE_USER_IMPERSONATE_COMPONENT} from '../../side-menu/content-components/injection-tokens';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';

@Injectable({
  providedIn: 'root'
})
export class ImpersonationUserSelectService {

    constructor(protected _log: LoggerService,
                protected _sideMenuService: SideMenuService,
                protected _snackBar: SnackBarService,
                protected _impersonation: ImpersonationService,
                @Optional() @Inject(NAE_USER_IMPERSONATE_COMPONENT) protected _userImpersonateComponent: any,
    ) {}

    /**
     * Opens side menu with users who can be impersonated by logged user
     */
    public selectImpersonate(): void {
        this._sideMenuService.open(this._userImpersonateComponent, SideMenuSize.MEDIUM).onClose.subscribe(event => {
            this._log.debug('Impersonable user select :' + event);
            if (event.data === undefined) {
                return;
            }
            this._impersonation.impersonate(event.data._id);
        });
    }
}
