import {EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormSubmitEvent, HasForm} from '../has-form';

export abstract class AbstractForgottenPasswordFormComponent implements OnInit, HasForm {

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
