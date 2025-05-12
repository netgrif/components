import {Component} from '@angular/core';
import {AbstractProfileComponent, IdentityService} from '@netgrif/components-core';

@Component({
    selector: 'nc-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
})
export class ProfileComponent extends AbstractProfileComponent {
    constructor(protected _userService: IdentityService) {
        super(_userService);
    }
}
