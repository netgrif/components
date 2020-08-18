import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {UserListItem} from '../../../../../user/services/user-list.service';

/**
 * Includes avatar user icon and full username in the side menu.
 */
@Component({
    selector: 'nae-user-assign-item',
    templateUrl: './user-assign-item.component.html',
    styleUrls: ['./user-assign-item.component.scss']
})
export class UserAssignItemComponent {
    /**
     * Value of the user held in this item component
     */
    @Input() user: UserListItem;

    /**
     * ID of the currently selected user
     */
    @Input() selectedId$: Observable<string>;

    constructor() {
    }
}
