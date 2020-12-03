import {EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormSubmitEvent, HasForm} from '../has-form';
import {ConfigurationService} from '../../configuration/configuration.service';
import {AbstractLegalFormComponent} from '../models/abstract-legal-form.component';

export abstract class AbstractEmailSubmissionFormComponent extends AbstractLegalFormComponent implements OnInit, HasForm {

    public rootFormGroup: FormGroup;

    @Output() public formSubmit: EventEmitter<FormSubmitEvent>;
    @Output() public goBackButton: EventEmitter<void>;

    protected constructor(formBuilder: FormBuilder, config: ConfigurationService) {
        super(config);
        this.rootFormGroup = formBuilder.group({
            email: ['', Validators.email]
        });
        this.formSubmit = new EventEmitter<FormSubmitEvent>();
        this.goBackButton = new EventEmitter<void>();
    }

    public ngOnInit() {
    }

    public emitGoBack() {
        this.goBackButton.emit();
    }

    public onSubmit() {
        if (!this.rootFormGroup.valid) {
            return;
        }
        this.formSubmit.emit({email: this.rootFormGroup.controls['email'].value});
    }
}
