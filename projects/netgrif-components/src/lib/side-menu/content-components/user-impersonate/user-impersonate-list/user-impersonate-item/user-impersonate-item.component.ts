import {Component} from '@angular/core';
import {AbstractUserAssignItemComponent} from '@netgrif/components-core';

/**
 * Includes avatar user icon and full username in the side menu.
 */
@Component({
    selector: 'nc-user-impersonate-item',
    templateUrl: './user-impersonate-item.component.html',
    styleUrls: ['./user-impersonate-item.component.scss']
})
export class UserImpersonateItemComponent extends AbstractUserAssignItemComponent {

    constructor() {
        super();
    }
}
