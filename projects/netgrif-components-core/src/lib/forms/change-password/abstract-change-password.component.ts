import {passwordValidator} from '../models/password.validator';
import {LoggerService} from '../../logger/services/logger.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageResource} from '../../resources/interface/message-resource';
import {TranslateService} from '@ngx-translate/core';
import {Component, EventEmitter, Inject, OnDestroy, Optional, Output} from '@angular/core';
import {FormSubmitEvent, HasForm} from "../has-form";
import {LoadingEmitter} from "../../utility/loading-emitter";
import {take} from "rxjs/operators";
import {UserChangePasswordRequest} from "../../authentication/profile/models/user-change-password-request";
import {ProfileService} from "../../authentication/profile/services/profile.service";
import {UserService} from "../../user/services/user.service";
import {encodeBase64} from '../../utility/base64';
import {NAE_DEFAULT_MIN_PASSWORD_LENGTH, NAE_MIN_PASSWORD_LENGTH} from "../min-password-length-token";

export const OLD_PASSWORD = 'oldPassword';
export const PASSWORD = 'password';
export const CONFIRM_PASSWORD = 'confirmPassword';

@Component({
    selector: 'ncc-abstract-change-password',
    template: ''
})
export abstract class AbstractChangePasswordComponent implements HasForm, OnDestroy {

    public rootFormGroup: FormGroup;
    public hideOldPassword: boolean;

    public hidePassword: boolean;
    public hideRepeatPassword: boolean;

    @Output() public formSubmit: EventEmitter<FormSubmitEvent>;
    @Output() public changePassword: EventEmitter<MessageResource>;

    public loadingSubmit: LoadingEmitter;

    protected constructor(protected formBuilder: FormBuilder,
                          protected profileService: ProfileService,
                          protected user: UserService,
                          protected _log: LoggerService,
                          protected _translate: TranslateService,
                          @Optional() @Inject(NAE_MIN_PASSWORD_LENGTH) protected minPasswordLength: number | undefined) {
        this.minPasswordLength = minPasswordLength ?? NAE_DEFAULT_MIN_PASSWORD_LENGTH;
        this.hidePassword = true;
        this.hideOldPassword = true;
        this.hideRepeatPassword = true;
        this.formSubmit = new EventEmitter<FormSubmitEvent>();
        this.changePassword = new EventEmitter<MessageResource>();
        this.loadingSubmit = new LoadingEmitter(false);
        this.rootFormGroup = formBuilder.group({
            oldPassword: ['', [Validators.required, Validators.minLength(1)]],
            password: ['', [Validators.required, Validators.minLength(this.minPasswordLength)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(this.minPasswordLength)]]
        }, {validator: passwordValidator});
    }


    public isFieldValid(formControlName: string): boolean {
        return this.rootFormGroup.get(formControlName).valid;
    }

    protected createRequestBody(): UserChangePasswordRequest {
        return {
            login: this.user.user.email,
            password: encodeBase64(this.rootFormGroup.controls[OLD_PASSWORD].value),
            newPassword: encodeBase64(this.rootFormGroup.controls[PASSWORD].value)
        };
    }

    public getErrorMessage(formControlName: string): string {
        const errors = this.rootFormGroup.get(formControlName).errors;
        if (errors === null) {
            return;
        }
        switch (Object.keys(errors)[0]) {
            case 'mismatchedPassword':
                return this._translate.instant('forms.register.passwordsMustMatch');
            case 'minlength':
                return this._translate.instant('dataField.validations.minLength', {length: this.minPasswordLength});
            case 'required':
                return this._translate.instant('dataField.validations.required');
        }
    }

    public onSubmit(): void {
        if (!this.rootFormGroup.valid) {
            return;
        }
        const request = this.createRequestBody();
        this.formSubmit.emit(request);

        this.loadingSubmit.on();
        this.profileService.changePassword(request).pipe(take(1)).subscribe(message => {
            if (message.error) {
                this.changePassword.emit({error: message.error});
            } else {
                this.changePassword.emit({success: message.success});
            }
            this.loadingSubmit.off();
        }, error => {
            this.changePassword.emit({error});
            this.loadingSubmit.off();
        });
    }

    ngOnDestroy(): void {
        this.formSubmit.complete();
        this.changePassword.complete();
        this.loadingSubmit.complete();
    }

}
