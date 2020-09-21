import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormSubmitEvent, HasForm} from '../has-form';
import {UserService} from '../../user/services/user.service';
import {User} from '../../user/models/user';
import {LoadingEmitter} from '../../utility/loading-emitter';

export abstract class AbstractLoginFormComponent implements OnInit, HasForm {

    public rootFormGroup: FormGroup;
    public hidePassword = true;
    public loading: LoadingEmitter;
    private _registerResetButtons: boolean;

    @Input() public downButtons: boolean;
    @Output() public login: EventEmitter<User>;
    @Output() public resetPassword: EventEmitter<void>;
    @Output() public signUp: EventEmitter<void>;
    @Output() public formSubmit: EventEmitter<FormSubmitEvent>;

    constructor(formBuilder: FormBuilder, protected _userService: UserService) {
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

    ngOnInit() {
        if (this.downButtons !== undefined) {
            this._registerResetButtons = this.downButtons;
        } else {
            this._registerResetButtons = true;
        }
    }

    get registerResetButtons() {
        return this._registerResetButtons;
    }

    onSubmit() {
        if (!this.rootFormGroup.valid || this.loading.isActive) {
            return;
        }
        const credential = {username: this.rootFormGroup.controls['login'].value, password: this.rootFormGroup.controls['password'].value};

        this.loading.on();
        this.formSubmit.emit(credential);
        this._userService.login(credential).subscribe((user: User) => {
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
}
