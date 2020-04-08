import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AbstractCard} from '../abstract-card';
import {Credentials} from '../../authentication/models/credentials';

@Component({
    selector: 'nae-forgotten-password-panel',
    templateUrl: './forgotten-password-card.component.html',
    styleUrls: ['./forgotten-password-card.component.scss']
})
export class ForgottenPasswordCardComponent extends AbstractCard implements OnInit {

    @Output() public email: EventEmitter<string>;

    constructor(private fb: FormBuilder) {
        super();
        this.form = fb.group({
            email: ['', Validators.email]
        });
        this.email = new EventEmitter<string>();
    }

    ngOnInit() {
    }

    onSubmit() {
        if (!this.form.valid) {
            return;
        }
        this.email.emit(this.form.controls['email'].value);
    }
}
