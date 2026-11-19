import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {UserListItem} from '../../../../../user/services/user-list.service';

/**
 * Includes avatar user icon and full username in the side menu.
 */
@Component({
    selector: 'ncc-abstract-user-assign-item',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractMultiUserAssignItemComponent {
    /**
     * Value of the user held in this item component
     */
    @Input() user: UserListItem;

    /**
     * ID of the currently selected user
     */
    @Input() selectedIds$: Observable<Array<string>>;

    constructor() {
    }
}
