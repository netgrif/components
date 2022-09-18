import {Component} from '@angular/core';
import {AbstractUserAssignItemComponent} from '@netgrif/components-core';

/**
 * Includes avatar user icon and full username in the side menu.
 */
@Component({
    selector: 'nc-admin-impersonate-item',
    templateUrl: './admin-impersonate-item.component.html',
    styleUrls: ['./admin-impersonate-item.component.scss']
})
export class AdminImpersonateItemComponent extends AbstractUserAssignItemComponent {

    constructor() {
        super();
    }
}
