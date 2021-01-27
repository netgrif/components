import {FormBuilder, Validators} from '@angular/forms';
import {passwordValidator} from '../models/password.validator';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {LoggerService} from '../../logger/services/logger.service';
import {AbstractRegistrationComponent} from '../models/abstract-registration.component';
import {UserRegistrationRequest} from '../../authentication/sign-up/models/user-registration-request';
import {Observable} from 'rxjs';
import {MessageResource} from '../../resources/interface/message-resource';
import {TranslateService} from '@ngx-translate/core';
import {Input, OnDestroy} from '@angular/core';

/**
 * Holds the logic of the `RegistrationFormComponent`.
 */
export abstract class AbstractRegistrationFormComponent extends AbstractRegistrationComponent implements OnDestroy {

    @Input() public displayLegalNotice = true;

    protected constructor(formBuilder: FormBuilder,
                          signupService: SignUpService,
                          log: LoggerService,
                          translate: TranslateService) {
        super(signupService, log, translate);
        this.rootFormGroup = formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]]
        }, {validator: passwordValidator});
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected createRequestBody(): UserRegistrationRequest {
        return {
            token: undefined,
            name: this.rootFormGroup.controls['name'].value,
            surname: this.rootFormGroup.controls['surname'].value,
            password: this.rootFormGroup.controls['password'].value
        };
    }

    protected callRegistration(requestBody: UserRegistrationRequest): Observable<MessageResource> {
        return this._signupService.signup(requestBody);
    }
}
