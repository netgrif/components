import {Component, Inject} from '@angular/core';
import {AbstractUserAssignComponent, NAE_SIDE_MENU_CONTROL, SideMenuControl, UserListService, ImpersonationUserListService} from '@netgrif/components-core';

/**
 * Is the main - parent component of the entire user assignment in the side menu.
 *
 * Holds logic link of the [UserAssignListComponent]{@link UserAssignListComponent}
 * along with searching, selecting, and then assigning to the user field.
 */
@Component({
    selector: 'nc-user-impersonate',
    templateUrl: './user-impersonate.component.html',
    styleUrls: ['./user-impersonate.component.scss'],
    providers: [{
        provide: UserListService, useClass: ImpersonationUserListService
    }]
})
export class UserImpersonateComponent extends AbstractUserAssignComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl) {
        super(_sideMenuControl);
    }
}
