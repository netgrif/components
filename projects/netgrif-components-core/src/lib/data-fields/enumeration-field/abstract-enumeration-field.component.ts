import {Component, Inject, Input, Optional} from '@angular/core';
import {EnumerationField} from './models/enumeration-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {FormControl} from '@angular/forms';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

/**
 * @deprecated
 * */
@Component({
    selector: 'ncc-abstract-enumeration-field',
    template: ''
})
export abstract class AbstractEnumerationFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: EnumerationField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
        this._formControl = new FormControl('');
    }
}
