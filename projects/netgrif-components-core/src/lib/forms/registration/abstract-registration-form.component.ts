import {FormBuilder, Validators} from '@angular/forms';
import {passwordValidator} from '../models/password.validator';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {LoggerService} from '../../logger/services/logger.service';
import {AbstractRegistrationComponent} from '../models/abstract-registration.component';
import {UserRegistrationRequest} from '../../authentication/sign-up/models/user-registration-request';
import {Observable} from 'rxjs';
import {MessageResource} from '../../resources/interface/message-resource';
import {TranslateService} from '@ngx-translate/core';
import {Component, Inject, Input, OnDestroy, Optional} from '@angular/core';
import {NAE_MIN_PASSWORD_LENGTH} from "../min-password-length-token";

/**
 * Holds the logic of the `RegistrationFormComponent`.
 */
@Component({
    selector: 'ncc-abstract-registration-form',
    template: ''
})
export abstract class AbstractRegistrationFormComponent extends AbstractRegistrationComponent implements OnDestroy {

    @Input() public displayLegalNotice = true;

    protected constructor(formBuilder: FormBuilder,
                          signupService: SignUpService,
                          log: LoggerService,
                          translate: TranslateService,
                          @Optional() @Inject(NAE_MIN_PASSWORD_LENGTH) minPasswordLength) {
        super(signupService, log, translate, minPasswordLength);
        this.rootFormGroup = formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(this.minPasswordLength)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(this.minPasswordLength)]]
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
