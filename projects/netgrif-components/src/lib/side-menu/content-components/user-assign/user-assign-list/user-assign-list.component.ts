import {Component} from '@angular/core';
import {AbstractUserAssignListComponent, UserListService} from '@netgrif/components-core';

/**
 * Is responsible for displaying, filtering, loading and selecting users.
 */
@Component({
    selector: 'nc-user-assign-list',
    templateUrl: './user-assign-list.component.html',
    styleUrls: ['./user-assign-list.component.scss']
})
export class UserAssignListComponent extends AbstractUserAssignListComponent {

    constructor(protected _userListService: UserListService) {
        super(_userListService);
    }
}
