import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AbstractRegistrationFormComponent, LoggerService, SignUpService} from '@netgrif/application-engine';

@Component({
    selector: 'nc-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent extends AbstractRegistrationFormComponent {
    constructor(formBuilder: FormBuilder, protected _signupService: SignUpService, protected _log: LoggerService) {
        super(formBuilder, _signupService, _log);
    }
}
