import {Component, Inject, Optional} from '@angular/core';
import {AbstractForgottenPasswordComponent, LoggerService, SignUpService, NAE_MIN_PASSWORD_LENGTH} from '@netgrif/components-core';
import {FormBuilder} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-forgotten-password-form',
    templateUrl: './forgotten-password-form.component.html',
    styleUrls: ['./forgotten-password-form.component.scss'],
    standalone: false
})
export class ForgottenPasswordFormComponent extends AbstractForgottenPasswordComponent {
    constructor(formBuilder: FormBuilder,
                signupService: SignUpService,
                log: LoggerService,
                translate: TranslateService,
                @Optional() @Inject(NAE_MIN_PASSWORD_LENGTH) minPasswordLength) {
        super(formBuilder, signupService, log, translate, minPasswordLength);
    }
}
