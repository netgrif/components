import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AbstractLoginFormComponent, UserService} from '@netgrif/components-core';

@Component({
    selector: 'nc-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: false
})
export class LoginFormComponent extends AbstractLoginFormComponent {
    constructor(formBuilder: FormBuilder, protected _userService: UserService) {
        super(formBuilder, _userService);
    }
}
