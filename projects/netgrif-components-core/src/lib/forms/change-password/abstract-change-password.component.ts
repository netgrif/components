import {passwordValidator} from '../models/password.validator';
import {LoggerService} from '../../logger/services/logger.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageResource} from '../../resources/interface/message-resource';
import {TranslateService} from '@ngx-translate/core';
import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {FormSubmitEvent, HasForm} from "../has-form";
import {LoadingEmitter} from "../../utility/loading-emitter";
import {take} from "rxjs/operators";
import {UserChangePasswordRequest} from "../../authentication/profile/models/user-change-password-request";
import {ProfileService} from "../../authentication/profile/services/profile.service";
import {UserService} from "../../user/services/user.service";
import {encodeBase64} from '../../utility/base64';

@Component({
    selector: 'ncc-abstract-forgotten-password',
    template: ''
})
export abstract class AbstractChangePasswordComponent implements HasForm, OnDestroy {

    protected readonly MIN_PASSWORD_LENGTH = 8;

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
                          protected _translate: TranslateService) {
        this.hidePassword = true;
        this.hideOldPassword = true;
        this.hideRepeatPassword = true;
        this.formSubmit = new EventEmitter<FormSubmitEvent>();
        this.changePassword = new EventEmitter<MessageResource>();
        this.loadingSubmit = new LoadingEmitter(false);
        this.rootFormGroup = formBuilder.group({
            oldPassword: ['', [Validators.required, Validators.minLength(1)]],
            password: ['', [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]]
        }, {validator: passwordValidator});
    }


    public isFieldValid(formControlName: string): boolean {
        return this.rootFormGroup.get(formControlName).valid;
    }

    protected createRequestBody(): UserChangePasswordRequest {
        return {
            login: this.user.user.email,
            password: encodeBase64(this.rootFormGroup.controls['oldPassword'].value),
            newPassword: encodeBase64(this.rootFormGroup.controls['password'].value)
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
                return this._translate.instant('dataField.validations.minLength', {length: this.MIN_PASSWORD_LENGTH});
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
            this.changePassword.emit({error: error});
            this.loadingSubmit.off();
        });
    }

    ngOnDestroy(): void {
        this.formSubmit.complete();
        this.changePassword.complete();
        this.loadingSubmit.complete();
    }

}
