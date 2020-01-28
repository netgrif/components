import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {passwordValidator} from "./password.validator";
import {AbstractPanel} from "../abstract-panel";

@Component({
    selector: 'nae-registration-panel',
    templateUrl: './registration-panel.component.html',
    styleUrls: ['./registration-panel.component.scss']
})
export class RegistrationPanelComponent extends AbstractPanel implements OnInit {
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
