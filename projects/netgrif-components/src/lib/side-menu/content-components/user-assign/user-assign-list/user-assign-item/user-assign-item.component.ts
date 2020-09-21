import {Component} from '@angular/core';
import {AbstractUserAssignItemComponent} from '@netgrif/application-engine';

/**
 * Includes avatar user icon and full username in the side menu.
 */
@Component({
    selector: 'nc-user-assign-item',
    templateUrl: './user-assign-item.component.html',
    styleUrls: ['./user-assign-item.component.scss']
})
export class UserAssignItemComponent extends AbstractUserAssignItemComponent {

    constructor() {
        super();
    }
}
