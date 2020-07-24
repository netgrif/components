import {FormGroup} from '@angular/forms';
import {EventEmitter} from '@angular/core';

export interface HasForm {
    rootFormGroup: FormGroup;
    formSubmit: EventEmitter<FormSubmitEvent>;

    onSubmit(): void;
}

export interface FormSubmitEvent {
    [k: string]: any;
}
