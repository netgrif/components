import {Component, Inject, Input, Optional} from '@angular/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {I18nField} from './models/i18n-field';
import {NAE_SAVE_DATA_INFORM} from '../models/save-data-inform-token';

@Component({
    selector: 'ncc-abstract-i18n-field',
    template: ''
})
export abstract class AbstractI18nFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: I18nField;

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) saveDataInform: boolean | null = false) {
        super(informAboutInvalidData, saveDataInform);
    }
}
