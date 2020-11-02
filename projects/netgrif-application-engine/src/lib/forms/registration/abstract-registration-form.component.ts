import {FormBuilder} from '@angular/forms';
import {passwordValidator} from './password.validator';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {LoggerService} from '../../logger/services/logger.service';
import {AbstractRegistrationComponent} from '../models/abstract-registration.component';
import {UserRegistrationRequest} from '../../authentication/sign-up/models/user-registration-request';
import {Observable} from 'rxjs';
import {MessageResource} from '../../resources/interface/message-resource';

/**
 * Holds the logic of the `RegistrationFormComponent`.
 */
export abstract class AbstractRegistrationFormComponent extends AbstractRegistrationComponent {

    protected constructor(formBuilder: FormBuilder, signupService: SignUpService, log: LoggerService) {
        super(signupService, log);
        this.rootFormGroup = formBuilder.group({
            name: [''],
            surname: [''],
            password: [''],
            confirmPassword: ['']
        }, {validator: passwordValidator});
    }

    protected callRegistration(requestBody: UserRegistrationRequest): Observable<MessageResource> {
        return this._signupService.signup(requestBody);
    }
}
