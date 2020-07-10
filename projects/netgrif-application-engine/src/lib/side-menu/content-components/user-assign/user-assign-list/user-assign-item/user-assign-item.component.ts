import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {UserValue} from '../../../../../data-fields/user-field/models/user-value';

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
    @Input() user: UserValue;

    /**
     * ID of the currently selected user
     */
    @Input() selectedId$: Observable<string>;

    constructor() {
    }
}
