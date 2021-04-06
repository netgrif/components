import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {Inject, Input, Optional} from '@angular/core';
import {FilterField} from './models/filter-field';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

export class AbstractFilterFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: FilterField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

}
