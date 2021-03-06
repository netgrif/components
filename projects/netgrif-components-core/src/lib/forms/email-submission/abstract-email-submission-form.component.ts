import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormSubmitEvent, HasForm} from '../has-form';
import {LoadingEmitter} from '../../utility/loading-emitter';

@Component({
    selector: 'ncc-abstract-email-submission-form',
    template: ''
})
export abstract class AbstractEmailSubmissionFormComponent implements HasForm, OnDestroy {

    public rootFormGroup: FormGroup;

    @Input() public displayLegalNotice = true;
    public loading = new LoadingEmitter();

    @Output() public formSubmit: EventEmitter<FormSubmitEvent>;
    @Output() public goBackButton: EventEmitter<void>;

    protected constructor(formBuilder: FormBuilder) {
        this.rootFormGroup = formBuilder.group({
            email: ['', Validators.email]
        });
        this.formSubmit = new EventEmitter<FormSubmitEvent>();
        this.goBackButton = new EventEmitter<void>();
    }

    ngOnDestroy(): void {
        this.formSubmit.complete();
        this.goBackButton.complete();
        this.loading.complete();
    }

    public emitGoBack() {
        this.goBackButton.emit();
    }

    public onSubmit() {
        if (!this.rootFormGroup.valid) {
            return;
        }
        this.formSubmit.emit({email: this.rootFormGroup.controls['email'].value, loading: this.loading});
    }
}
