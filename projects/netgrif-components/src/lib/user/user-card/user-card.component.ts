import {Component, Injector, ChangeDetectionStrategy} from '@angular/core';
import {AbstractUserCardComponent, userInitials} from '@netgrif/components-core';

@Component({
    selector: 'nc-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UserCardComponent extends AbstractUserCardComponent {

    constructor(protected _injector: Injector) {
        super(_injector);
    }

    /** the user has an own avatar image, otherwise the initials are shown (like the user fields) */
    public get hasAvatar(): boolean {
        return !!this.user?.['avatar'];
    }

    /** initials of the user (first letters of the name and of the surname) */
    public get initials(): string {
        return userInitials(this.user);
    }
}
