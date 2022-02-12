import {Component, Inject} from '@angular/core';
import {AbstractUserAssignComponent, NAE_SIDE_MENU_CONTROL, SideMenuControl, UserListService} from '@netgrif/components-core';

/**
 * Is the main - parent component of the entire user assignment in the side menu.
 *
 * Holds logic link of the [UserAssignListComponent]{@link UserAssignListComponent}
 * along with searching, selecting, and then assigning to the user field.
 */
@Component({
    selector: 'nc-user-assign',
    templateUrl: './user-assign.component.html',
    styleUrls: ['./user-assign.component.scss'],
    providers: [UserListService]
})
export class UserAssignComponent extends AbstractUserAssignComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl) {
        super(_sideMenuControl);
    }
}
