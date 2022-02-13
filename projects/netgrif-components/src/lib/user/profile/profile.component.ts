import {Component} from '@angular/core';
import {AbstractProfileComponent, UserService} from '@netgrif/components-core';

@Component({
    selector: 'nc-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends AbstractProfileComponent {
    constructor(protected _userService: UserService) {
        super(_userService);
    }
}
