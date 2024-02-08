import {Component, Inject, Input, Optional} from '@angular/core';
import {DateField} from './models/date-field';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {AbstractDataFieldComponent} from "../models/abstract-data-field-component";
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {LanguageService} from '../../translate/language.service';

/**
 * @deprecated as of v6.4.0
 * */
@Component({
    selector: 'ncc-abstract-date-field',
    template: ''
})
export abstract class AbstractDateFieldComponent extends AbstractDataFieldComponent{

    @Input() public dataField: DateField;

    protected constructor(protected _adapter: DateAdapter<any>,
                          @Inject(MAT_DATE_LOCALE) protected _locale: string,
                          protected _languageService: LanguageService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(_adapter, _locale, _languageService, informAboutInvalidData);
    }
}
