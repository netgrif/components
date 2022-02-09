import {Inject, Input, Optional} from '@angular/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {I18nField} from './models/i18n-field';


export class AbstractI18nFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: I18nField;

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

    public getType(): string {
        return !!this.dataField.component?.name ? this.dataField.component.name : '';
    }
}
