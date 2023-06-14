import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {FilterField} from './models/filter-field';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

/**
 * @deprecated
 * */
@Component({
    selector: 'ncc-abstract-filter-field',
    template: ''
})
export abstract class AbstractFilterFieldComponent extends AbstractDataFieldComponent implements OnInit {

    @Input() dataField: FilterField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
