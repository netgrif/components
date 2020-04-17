import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AbstractCard} from '../abstract-card';
import {Credentials} from '../../authentication/models/credentials';

/**
 * Provides a login card.
 */
@Component({
    selector: 'nae-login-panel',
    templateUrl: './login-card.component.html',
    styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent extends AbstractCard implements OnInit {

    /**
     * Event emitted when user submit login button
     */
    @Output() public login: EventEmitter<Credentials>;

    /**
     * Event emitted when user submit reset password button
     */
    @Output() public resetPassword: EventEmitter<void>;

    /**
     * Event emitted when user submit sign-up button
     */
    @Output() public signUp: EventEmitter<void>;

    /**
     * @ignore
     */
    hidePassword = true;

    /**
     * @ignore
     */
    constructor(private fb: FormBuilder) {
        super();
        this.form = fb.group({
            login: [''],
            password: ['']
        });
        this.login = new EventEmitter<Credentials>();
        this.resetPassword = new EventEmitter<void>();
        this.signUp = new EventEmitter<void>();
    }

    /**
     * @ignore
     */
    ngOnInit() {
    }

    /**
     * Check if form is valid and then emit entered user login and password values
     */
    onSubmit() {
        if (!this.form.valid) {
            return;
        }
        this.login.emit({username: this.form.controls['login'].value, password: this.form.controls['password'].value});
    }

    /**
     * @ignore
     */
    resetEmit() {
        this.resetPassword.emit();
    }

    /**
     * @ignore
     */
    signUpEmit() {
        this.signUp.emit();
    }
}
