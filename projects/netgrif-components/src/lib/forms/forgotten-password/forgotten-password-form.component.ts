import {Component} from '@angular/core';
import {AbstractForgottenPasswordComponent, LoggerService, SignUpService} from '@netgrif/components-core';
import {FormBuilder} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-forgotten-password-form',
    templateUrl: './forgotten-password-form.component.html',
    styleUrls: ['./forgotten-password-form.component.scss']
})
export class ForgottenPasswordFormComponent extends AbstractForgottenPasswordComponent {
    constructor(formBuilder: FormBuilder,
                signupService: SignUpService,
                log: LoggerService,
                translate: TranslateService) {
        super(formBuilder, signupService, log, translate);
    }
}
