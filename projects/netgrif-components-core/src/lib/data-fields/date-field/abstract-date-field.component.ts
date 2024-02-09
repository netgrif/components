import {Component, Inject, Input, Optional} from '@angular/core';
import {DateField} from './models/date-field';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {AbstractDataFieldComponent} from "../models/abstract-data-field-component";

/**
 * @deprecated as of v6.4.0
 * */
@Component({
    selector: 'ncc-abstract-date-field',
    template: ''
})
export abstract class AbstractDateFieldComponent extends AbstractDataFieldComponent{

    @Input() declare public dataField: DateField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
