import {Component, Inject, Input, Optional} from '@angular/core';
import {TextField} from './models/text-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

@Component({
    selector: 'ncc-abstract-text-field',
    template: ''
})
export abstract class AbstractTextFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: TextField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
