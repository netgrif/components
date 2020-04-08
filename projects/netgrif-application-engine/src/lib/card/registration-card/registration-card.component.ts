import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {passwordValidator} from './password.validator';
import {AbstractCard} from '../abstract-card';
import {Credentials} from '../../authentication/models/credentials';

export interface Register {
    email: string;
    name: string;
    surname: string;
    password: string;
}

@Component({
    selector: 'nae-registration-panel',
    templateUrl: './registration-card.component.html',
    styleUrls: ['./registration-card.component.scss']
})
export class RegistrationCardComponent extends AbstractCard implements OnInit {

    public hidePassword: boolean;
    public hideRepeatPassword: boolean;
    @Output() public register: EventEmitter<Register>;

    constructor(private _fb: FormBuilder) {
        super();
        this.form = _fb.group({
            email: ['', Validators.email],
            name: [''],
            surname: [''],
            password: [''],
            confirmPassword: ['']
        }, {validator: passwordValidator});
        this.hidePassword = true;
        this.hideRepeatPassword = true;
        this.register = new EventEmitter<Register>();
    }

    public ngOnInit(): void {
    }

    public onSubmit(): void {
        if (!this.form.valid) {
            return;
        }
        this.register.emit({
            email: this.form.controls['email'].value,
            name: this.form.controls['name'].value,
            surname: this.form.controls['surname'].value,
            password: this.form.controls['password'].value
        });
    }

}
