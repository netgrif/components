import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AbstractLoginFormComponent, ConfigurationService, UserService} from '@netgrif/components-core';

@Component({
    selector: 'nc-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends AbstractLoginFormComponent {
    constructor(formBuilder: FormBuilder, protected _userService: UserService, protected _config: ConfigurationService) {
        super(formBuilder, _userService, _config);
    }
}
