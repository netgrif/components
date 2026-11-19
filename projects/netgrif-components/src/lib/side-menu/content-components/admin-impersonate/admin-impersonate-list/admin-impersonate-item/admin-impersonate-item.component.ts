import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractUserAssignItemComponent, userInitials} from '@netgrif/components-core';

/**
 * Includes avatar user icon and full username in the side menu.
 */
@Component({
    selector: 'nc-admin-impersonate-item',
    templateUrl: './admin-impersonate-item.component.html',
    styleUrls: ['./admin-impersonate-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AdminImpersonateItemComponent extends AbstractUserAssignItemComponent {

    constructor() {
        super();
    }

    /** initials of the user for the avatar (first letters of the name and of the surname) */
    public get initials(): string {
        return userInitials(this.user);
    }
}
