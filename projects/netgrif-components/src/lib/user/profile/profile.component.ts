import {Component} from '@angular/core';
import {UserService, AbstractProfileComponent} from '@netgrif/application-engine';

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
