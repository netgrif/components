import {EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormSubmitEvent, HasForm} from '../has-form';
import {UserService} from '../../user/services/user.service';
import {User} from '../../user/models/user';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {take} from 'rxjs/operators';

export abstract class AbstractLoginFormComponent implements HasForm, OnDestroy {

    public rootFormGroup: FormGroup;
    public hidePassword = true;
    public loading: LoadingEmitter;

    @Input() public showSignUpButton: boolean;
    @Input() public showForgottenPasswordButton: boolean;
    @Output() public login: EventEmitter<User>;
    @Output() public resetPassword: EventEmitter<void>;
    @Output() public signUp: EventEmitter<void>;
    @Output() public formSubmit: EventEmitter<FormSubmitEvent>;

    protected constructor(formBuilder: FormBuilder, protected _userService: UserService) {
        this.rootFormGroup = formBuilder.group({
            login: [''],
            password: ['']
        });
        this.login = new EventEmitter<User>();
        this.resetPassword = new EventEmitter<void>();
        this.signUp = new EventEmitter<void>();
        this.formSubmit = new EventEmitter<FormSubmitEvent>();
        this.loading = new LoadingEmitter();
    }

    ngOnDestroy(): void {
        this.loading.complete();
        this.login.complete();
        this.resetPassword.complete();
        this.signUp.complete();
        this.formSubmit.complete();
    }

    onSubmit() {
        if (!this.rootFormGroup.valid || this.loading.isActive) {
            return;
        }
        const credential = {username: this.rootFormGroup.controls['login'].value, password: this.rootFormGroup.controls['password'].value};

        this.loading.on();
        this.formSubmit.emit(credential);
        this._userService.login(credential).pipe(take(1)).subscribe((user: User) => {
            this.login.emit(user);
            this.loading.off();
        });
    }

    resetEmit() {
        this.resetPassword.emit();
    }

    signUpEmit() {
        this.signUp.emit();
    }

    getButtonsFxLayoutAlign(): string {
        if (this.showSignUpButton || this.showForgottenPasswordButton) {
            return 'space-between';
        }
        return 'end';
    }
}
