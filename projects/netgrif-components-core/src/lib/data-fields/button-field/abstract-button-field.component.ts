import {Component, Inject, Input, Optional} from '@angular/core';
import {ButtonField} from './models/button-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';


@Component({
    selector: 'ncc-abstract-button-field',
    template: ''
})
export abstract class AbstractButtonFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: ButtonField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
