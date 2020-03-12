import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AbstractCard} from '../abstract-card';

@Component({
    selector: 'nae-forgotten-password-panel',
    templateUrl: './forgotten-password-card.component.html',
    styleUrls: ['./forgotten-password-card.component.scss']
})
export class ForgottenPasswordCardComponent extends AbstractCard implements OnInit {

    constructor(private fb: FormBuilder) {
        super();
        this.form = fb.group({
            login: [''],
            email: ['', Validators.email]
        });
    }

    ngOnInit() {
    }

    onSubmit(form: object) {
        console.log(form);
    }
}
