import {AbstractRegistrationComponent} from '../models/abstract-registration.component';
import {passwordValidator} from '../models/password.validator';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {LoggerService} from '../../logger/services/logger.service';
import {FormBuilder} from '@angular/forms';
import {UserRegistrationRequest} from '../../authentication/sign-up/models/user-registration-request';
import {Observable} from 'rxjs';
import {MessageResource} from '../../resources/interface/message-resource';

export abstract class AbstractForgottenPasswordComponent extends AbstractRegistrationComponent {

    protected constructor(formBuilder: FormBuilder, signupService: SignUpService, log: LoggerService) {
        super(signupService, log);
        this.rootFormGroup = formBuilder.group({
            password: [''],
            confirmPassword: ['']
        }, {validator: passwordValidator});
    }

    protected createRequestBody(): UserRegistrationRequest {
        return {
            token: undefined,
            name: undefined,
            surname: undefined,
            password: this.rootFormGroup.controls['password'].value
        };
    }

    protected callRegistration(requestBody: UserRegistrationRequest): Observable<MessageResource> {
        return this._signupService.recoverPassword(requestBody.token, requestBody.password);
    }
}
