import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractProfileComponent, UserService, userInitials} from '@netgrif/components-core';

@Component({
    selector: 'nc-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProfileComponent extends AbstractProfileComponent {
    constructor(protected _userService: UserService) {
        super(_userService);
    }

    /** the user has an own avatar image, otherwise the initials are shown (like the user card and the user fields) */
    public get hasAvatar(): boolean {
        return !!this.user?.['avatar'];
    }

    /** initials of the user (first letters of the name and of the surname) */
    public get initials(): string {
        return userInitials(this.user);
    }
}
