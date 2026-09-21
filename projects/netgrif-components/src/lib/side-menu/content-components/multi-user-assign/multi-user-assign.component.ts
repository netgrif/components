import {Component, Inject} from '@angular/core';
import {AbstractMultiUserAssignComponent, NAE_SIDE_MENU_CONTROL, SideMenuControl, UserListService} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-multi-user-assign',
    templateUrl: './multi-user-assign.component.html',
    styleUrls: ['./multi-user-assign.component.scss'],
    providers: [UserListService]
})
export class MultiUserAssignComponent extends AbstractMultiUserAssignComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl) {
        super(_sideMenuControl);
    }
}
