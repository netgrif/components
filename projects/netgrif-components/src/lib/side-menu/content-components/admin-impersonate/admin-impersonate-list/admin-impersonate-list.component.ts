import {Component} from '@angular/core';
import {AbstractUserAssignListComponent, UserListService} from '@netgrif/components-core';

/**
 * Is responsible for displaying, filtering, loading and selecting users.
 */
@Component({
    selector: 'nc-admin-impersonate-list',
    templateUrl: './admin-impersonate-list.component.html',
    styleUrls: ['./admin-impersonate-list.component.scss']
})
export class AdminImpersonateListComponent extends AbstractUserAssignListComponent {

    constructor(userListService: UserListService) {
        super(userListService);
    }
}
