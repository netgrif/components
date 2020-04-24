import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormSubmitEvent, HasForm} from '../has-form';

@Component({
    selector: 'nae-forgotten-password-form',
    templateUrl: './forgotten-password-form.component.html',
    styleUrls: ['./forgotten-password-form.component.scss']
})
export class ForgottenPasswordFormComponent implements OnInit, HasForm {

    public rootFormGroup: FormGroup;

    @Output() public formSubmit: EventEmitter<FormSubmitEvent>;

    constructor(formBuilder: FormBuilder) {
        this.rootFormGroup = formBuilder.group({
            email: ['', Validators.email]
        });
        this.formSubmit = new EventEmitter<FormSubmitEvent>();
    }

    public ngOnInit() {
    }

    public onSubmit() {
        if (!this.rootFormGroup.valid) {
            return;
        }
        this.formSubmit.emit({email: this.rootFormGroup.controls['email'].value});
    }
}
