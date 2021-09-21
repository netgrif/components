import {AbstractRegistrationComponent} from '../models/abstract-registration.component';
import {passwordValidator} from '../models/password.validator';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {LoggerService} from '../../logger/services/logger.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MessageResource} from '../../resources/interface/message-resource';
import {TranslateService} from '@ngx-translate/core';
import {Input, OnDestroy} from '@angular/core';
import {UserPasswordRequest} from '../../authentication/sign-up/models/user-password-request';

export abstract class AbstractForgottenPasswordComponent extends AbstractRegistrationComponent implements OnDestroy {

    @Input() public displayLegalNotice = false;

    protected constructor(formBuilder: FormBuilder,
                          signupService: SignUpService,
                          log: LoggerService,
                          translate: TranslateService) {
        super(signupService, log, translate);
        this.rootFormGroup = formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]]
        }, {validator: passwordValidator});
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected createRequestBody(): UserPasswordRequest {
        return {
            token: '',
            password: this.rootFormGroup.controls['password'].value
        };
    }

    protected callRegistration(requestBody: UserPasswordRequest): Observable<MessageResource> {
        return this._signupService.recoverPassword(requestBody.token, requestBody.password);
    }
}
