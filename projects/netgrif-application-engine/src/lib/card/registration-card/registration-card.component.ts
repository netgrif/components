import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {passwordValidator} from './password.validator';
import {AbstractCard} from '../abstract-card';
import {LoggerService} from '../../logger/services/logger.service';

@Component({
    selector: 'nae-registration-panel',
    templateUrl: './registration-card.component.html',
    styleUrls: ['./registration-card.component.scss']
})
export class RegistrationCardComponent extends AbstractCard implements OnInit {

    public hidePassword: boolean;
    public hideRepeatPassword: boolean;

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
    }

    public ngOnInit(): void {
    }

    public onSubmit(): void {

    }

}
