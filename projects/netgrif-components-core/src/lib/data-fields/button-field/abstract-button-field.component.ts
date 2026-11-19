import {Component, Inject, Input, Optional, ChangeDetectionStrategy} from '@angular/core';
import {ButtonField} from './models/button-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

/**
 * @deprecated
 * */
@Component({
    selector: 'ncc-abstract-button-field',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractButtonFieldComponent extends AbstractDataFieldComponent {

    @Input() declare dataField: ButtonField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
