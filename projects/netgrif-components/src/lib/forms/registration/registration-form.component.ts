import {Component, Inject, Optional} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AbstractRegistrationFormComponent, LoggerService, SignUpService, NAE_MIN_PASSWORD_LENGTH} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
    standalone: false
})
export class RegistrationFormComponent extends AbstractRegistrationFormComponent {
    constructor(formBuilder: FormBuilder,
                signupService: SignUpService,
                log: LoggerService,
                translate: TranslateService,
                @Optional() @Inject(NAE_MIN_PASSWORD_LENGTH) minPasswordLength) {
        super(formBuilder, signupService, log, translate, minPasswordLength);
    }
}
