import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AbstractForgottenPasswordFormComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-forgotten-password-form',
    templateUrl: './forgotten-password-form.component.html',
    styleUrls: ['./forgotten-password-form.component.scss']
})
export class ForgottenPasswordFormComponent extends AbstractForgottenPasswordFormComponent {
    constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }
}
