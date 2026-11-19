import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractMultiUserAssignItemComponent, userInitials} from '@netgrif/components-core';

@Component({
  selector: 'nc-multi-user-assign-item',
  templateUrl: './multi-user-assign-item.component.html',
  styleUrls: ['./multi-user-assign-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MultiUserAssignItemComponent extends AbstractMultiUserAssignItemComponent {

    constructor() {
        super();
    }

    /** initials of the user for the avatar (first letters of the name and of the surname) */
    public get initials(): string {
        return userInitials(this.user);
    }
}
