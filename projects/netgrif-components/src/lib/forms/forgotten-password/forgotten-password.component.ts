import {Component} from '@angular/core';
import {AbstractForgottenPasswordComponent, LoggerService, SignUpService} from '@netgrif/application-engine';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'nc-forgotten-password',
    templateUrl: './forgotten-password.component.html',
    styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent extends AbstractForgottenPasswordComponent {
    constructor(formBuilder: FormBuilder, signupService: SignUpService, log: LoggerService) {
        super(formBuilder, signupService, log);
    }
}
