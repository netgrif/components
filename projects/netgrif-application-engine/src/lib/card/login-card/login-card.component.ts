import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AbstractCard} from '../abstract-card';
import {Credentials} from '../../authentication/models/credentials';

@Component({
    selector: 'nae-login-panel',
    templateUrl: './login-card.component.html',
    styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent extends AbstractCard implements OnInit {

    hidePassword = true;
    @Output() public login: EventEmitter<Credentials>;
    @Output() public resetPassword: EventEmitter<void>;
    @Output() public signUp: EventEmitter<void>;

    constructor(private fb: FormBuilder) {
        super();
        this.form = fb.group({
            login: [''],
            password: ['']
        });
        this.login = new EventEmitter<Credentials>();
    }

    ngOnInit() {
    }

    onSubmit() {
        if (!this.form.valid) {
            return;
        }
        this.login.emit({username: this.form.controls['login'].value, password: this.form.controls['password'].value});
    }

    resetEmit() {
        this.resetPassword.emit();
    }

    signUpEmit() {
        this.signUp.emit();
    }
}
