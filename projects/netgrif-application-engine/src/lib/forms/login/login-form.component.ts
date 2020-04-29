import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormSubmitEvent, HasForm} from '../has-form';
import {UserService} from '../../user/services/user.service';
import {User} from '../../user/models/user';

@Component({
    selector: 'nae-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, HasForm {

    public rootFormGroup: FormGroup;
    public hidePassword = true;

    @Output() public login: EventEmitter<User>;
    @Output() public resetPassword: EventEmitter<void>;
    @Output() public signUp: EventEmitter<void>;
    @Output() public formSubmit: EventEmitter<FormSubmitEvent>;

    constructor(formBuilder: FormBuilder, private _userService: UserService) {
        this.rootFormGroup = formBuilder.group({
            login: [''],
            password: ['']
        });
        this.login = new EventEmitter<User>();
        this.resetPassword = new EventEmitter<void>();
        this.signUp = new EventEmitter<void>();
        this.formSubmit = new EventEmitter<FormSubmitEvent>();
    }

    ngOnInit() {
    }

    onSubmit() {
        if (!this.rootFormGroup.valid) {
            return;
        }
        const credential = {username: this.rootFormGroup.controls['login'].value, password: this.rootFormGroup.controls['password'].value};

        this.formSubmit.emit(credential);
        this._userService.login(credential).subscribe((user: User) => {
            this.login.emit(user);
        });
    }

    resetEmit() {
        this.resetPassword.emit();
    }

    signUpEmit() {
        this.signUp.emit();
    }
}
