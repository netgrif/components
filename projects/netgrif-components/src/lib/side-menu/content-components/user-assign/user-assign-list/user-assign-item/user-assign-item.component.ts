import {Component} from '@angular/core';
import {AbstractUserAssignItemComponent} from '@netgrif/components-core';

/**
 * Includes avatar user icon and full username in the side menu.
 */
@Component({
    selector: 'nc-user-assign-item',
    templateUrl: './user-assign-item.component.html',
    styleUrls: ['./user-assign-item.component.scss'],
    standalone: false
})
export class UserAssignItemComponent extends AbstractUserAssignItemComponent {

    constructor() {
        super();
    }
}
