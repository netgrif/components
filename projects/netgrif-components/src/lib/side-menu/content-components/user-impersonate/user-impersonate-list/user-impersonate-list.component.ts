import {Component} from '@angular/core';
import {AbstractUserAssignListComponent, UserListService} from '@netgrif/components-core';

/**
 * Is responsible for displaying, filtering, loading and selecting users.
 */
@Component({
    selector: 'nc-user-impersonate-list',
    templateUrl: './user-impersonate-list.component.html',
    styleUrls: ['./user-impersonate-list.component.scss']
})
export class UserImpersonateListComponent extends AbstractUserAssignListComponent {

    constructor(protected _userListService: UserListService) {
        super(_userListService);
    }
}
