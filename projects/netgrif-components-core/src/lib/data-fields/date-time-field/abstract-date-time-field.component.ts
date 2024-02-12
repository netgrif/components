import {Component, Inject, Input, Optional} from '@angular/core';
import {DateTimeField} from './models/date-time-field';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {AbstractDataFieldComponent} from "../models/abstract-data-field-component";

/**
 * @deprecated as of v6.4.0
 * */
@Component({
    selector: 'ncc-abstract-date-time-field',
    template: ''
})
export abstract class AbstractDateTimeFieldComponent extends AbstractDataFieldComponent {

    @Input() public dataField: DateTimeField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
