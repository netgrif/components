import {EventEmitter, Input, Output} from '@angular/core';
import {FormSubmitEvent, HasForm} from '../has-form';
import {FormGroup} from '@angular/forms';
import {MessageResource} from '../../resources/interface/message-resource';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {LoggerService} from '../../logger/services/logger.service';
import {UserRegistrationRequest} from '../../authentication/sign-up/models/user-registration-request';
import {Observable} from 'rxjs';

/**
 * Holds the logic that is shared between `RegistrationFormComponent` and `ForgottenPasswordFormComponent`.
 */
export abstract class AbstractRegistrationComponent implements HasForm {

    public rootFormGroup: FormGroup;
    public hidePassword: boolean;
    public hideRepeatPassword: boolean;

    @Output() public formSubmit: EventEmitter<FormSubmitEvent>;
    @Output() public register: EventEmitter<MessageResource>;
    /**
     * Emits whenever the provided token gets resolved as invalid
     */
    @Output() public invalidToken: EventEmitter<void>;

    private _token: string;
    private _tokenVerified: boolean;
    public loadingToken: LoadingEmitter;
    public userEmail: string;

    protected constructor(protected _signupService: SignUpService, protected _log: LoggerService) {
        this.hidePassword = true;
        this.hideRepeatPassword = true;
        this.formSubmit = new EventEmitter<FormSubmitEvent>();
        this.register = new EventEmitter<MessageResource>();
        this.invalidToken = new EventEmitter<void>();
        this._tokenVerified = false;
        this.loadingToken = new LoadingEmitter(true);
    }

    @Input()
    set token(token: string) {
        this._token = token;
        if (!this._token) {
            this._tokenVerified = false;
            return;
        }
        this.loadingToken.on();
        this._signupService.verify(this._token).subscribe(message => {
            this._log.info('Token ' + this._token + ' has been successfully verified');
            if (message.success) {
                this.userEmail = message.success;
            }
            this._tokenVerified = true;
            this.loadingToken.off();
        }, (error: Error) => {
            this._log.error(error.message);
            this._tokenVerified = false;
            this.loadingToken.off();
            this.invalidToken.emit();
        });
    }

    get token(): string {
        return this._token;
    }

    get tokenVerified(): boolean {
        return this._tokenVerified;
    }

    public onSubmit(): void {
        if (!this.rootFormGroup.valid) {
            return;
        }
        const request = this.createRequestBody();
        this.formSubmit.emit(request);

        if (!this._tokenVerified) {
            this.register.emit({error: 'Provided token ' + this._token + ' is not valid'});
            return;
        }
        request.token = this._token;
        this.callRegistration(request).subscribe(message => {
            this.register.emit(message);
        }, error => {
            this.register.emit({error});
        });
    }

    protected abstract createRequestBody(): UserRegistrationRequest;

    protected abstract callRegistration(requestBody: UserRegistrationRequest): Observable<MessageResource>;
}
