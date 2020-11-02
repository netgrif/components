import {Component} from '@angular/core';
import {AbstractForgottenPasswordComponent, LoggerService, SignUpService} from '@netgrif/application-engine';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'nc-forgotten-password',
    templateUrl: './forgotten-password-form.component.html',
    styleUrls: ['./forgotten-password-form.component.scss']
})
export class ForgottenPasswordFormComponent extends AbstractForgottenPasswordComponent {
    constructor(formBuilder: FormBuilder, signupService: SignUpService, log: LoggerService) {
        super(formBuilder, signupService, log);
    }
}
