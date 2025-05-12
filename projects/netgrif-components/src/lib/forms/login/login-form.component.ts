import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AbstractLoginFormComponent, IdentityService} from '@netgrif/components-core';

@Component({
    selector: 'nc-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: false
})
export class LoginFormComponent extends AbstractLoginFormComponent {
    constructor(formBuilder: FormBuilder, protected _identityService: IdentityService) {
        super(formBuilder, _identityService);
    }
}
