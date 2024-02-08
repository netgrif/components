import {Component, Inject, Input, Optional} from '@angular/core';
import {DateTimeField} from './models/date-time-field';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {AbstractDataFieldComponent} from "../models/abstract-data-field-component";
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {LanguageService} from '../../translate/language.service';
import {NgxMatDateAdapter} from '@angular-material-components/datetime-picker';

/**
 * @deprecated as of v6.4.0
 * */
@Component({
    selector: 'ncc-abstract-date-time-field',
    template: ''
})
export abstract class AbstractDateTimeFieldComponent extends AbstractDataFieldComponent {

    @Input() public dataField: DateTimeField;

    protected constructor(protected _adapter: NgxMatDateAdapter<any>,
                          @Inject(MAT_DATE_LOCALE) protected _locale: string,
                          protected _languageService: LanguageService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(_adapter, _locale, _languageService, informAboutInvalidData);
    }
}
