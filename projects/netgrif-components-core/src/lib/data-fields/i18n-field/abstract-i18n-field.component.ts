import {Component, Inject, Input, Optional} from '@angular/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {I18nField} from './models/i18n-field';

@Component({
    selector: 'ncc-abstract-i18n-field',
    template: ''
})
export abstract class AbstractI18nFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: I18nField;

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
