import {Component, Inject, Input, Optional} from '@angular/core';
import {BooleanField} from './models/boolean-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {FormControl} from '@angular/forms';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

/**
 * @deprecated
 * */
@Component({
    selector: 'ncc-abstract-boolean-field',
    template: ''
})
export abstract class AbstractBooleanFieldComponent extends AbstractDataFieldComponent {

    @Input() declare dataField: BooleanField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
        this._formControl = new FormControl('');
    }
}
