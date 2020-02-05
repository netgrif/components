import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AbstractCard} from "../abstract-card";

@Component({
    selector: 'nae-login-panel',
    templateUrl: './login-card.component.html',
    styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent extends AbstractCard implements OnInit {
    hidePassword = true;

    constructor(private fb: FormBuilder, public route: Router) {
        super();
        this.form = fb.group({
            login: [''],
            password: ['']
        });
    }

    ngOnInit() {
    }

    onSubmit(form: object) {
        console.log(form);
    }
}
