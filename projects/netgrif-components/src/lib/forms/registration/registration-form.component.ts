import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AbstractRegistrationFormComponent, ConfigurationService, LoggerService, SignUpService} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent extends AbstractRegistrationFormComponent {
    constructor(formBuilder: FormBuilder,
                signupService: SignUpService,
                log: LoggerService,
                translate: TranslateService,
                config: ConfigurationService) {
        super(formBuilder, signupService, log, translate, config);
    }
}
