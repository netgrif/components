import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {passwordValidator} from './password.validator';
import {AbstractCard} from '../abstract-card';

@Component({
    selector: 'nae-registration-panel',
    templateUrl: './registration-card.component.html',
    styleUrls: ['./registration-card.component.scss']
})
export class RegistrationCardComponent extends AbstractCard implements OnInit {
    hidePassword = true;
    hideRepeatPassword = true;

    constructor(private fb: FormBuilder) {
        super();
        this.form = fb.group({
            login: [''],
            email: ['', Validators.email],
            password: [''],
            confirmPassword: ['']
        }, {validator: passwordValidator});
    }

    ngOnInit() {
    }

    onSubmit(form: object) {
        console.log(form);
    }

}
