import {Component} from '@angular/core';
import {AbstractMultiUserAssignListComponent, UserListService} from '@netgrif/components-core';

@Component({
  selector: 'nc-multi-user-assign-list',
  templateUrl: './multi-user-assign-list.component.html',
  styleUrls: ['./multi-user-assign-list.component.scss'],
    standalone: false
})
export class MultiUserAssignListComponent extends AbstractMultiUserAssignListComponent {

    constructor(protected _userListService: UserListService) {
        super(_userListService);
    }

}
