import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AbstractCard} from '../abstract-card';


/**
 * Provides a forgotten password card.
 */
@Component({
    selector: 'nae-forgotten-password-panel',
    templateUrl: './forgotten-password-card.component.html',
    styleUrls: ['./forgotten-password-card.component.scss']
})
export class ForgottenPasswordCardComponent extends AbstractCard implements OnInit {

    /**
     * Event emitted when user submit form.
     * Emit user's validated email
     */
    @Output() public email: EventEmitter<string>;

    /**
     * @ignore
     */
    constructor(private fb: FormBuilder) {
        super();
        this.form = fb.group({
            email: ['', Validators.email]
        });
        this.email = new EventEmitter<string>();
    }

    /**
     * @ignore
     */
    ngOnInit() {
    }

    /**
     * Check if form is valid and then emit user email
     */
    onSubmit() {
        if (!this.form.valid) {
            return;
        }
        this.email.emit(this.form.controls['email'].value);
    }
}
