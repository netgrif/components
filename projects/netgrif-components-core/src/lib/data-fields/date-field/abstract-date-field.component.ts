import {Component, Inject, Input, Optional} from '@angular/core';
import {DateField} from './models/date-field';
import {AbstractTimeInstanceFieldComponent} from '../time-instance-abstract-field/abstract-time-instance-field.component';
import {TranslateService} from '@ngx-translate/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {LanguageService} from '../../translate/language.service';

@Component({
    selector: 'ncc-abstract-date-field',
    template: ''
})
export abstract class AbstractDateFieldComponent extends AbstractTimeInstanceFieldComponent {

    @Input() public dataField: DateField;

    protected constructor(protected _translate: TranslateService,
                          protected _adapter: DateAdapter<any>,
                          @Inject(MAT_DATE_LOCALE) protected _locale: string,
                          protected _languageService: LanguageService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(_translate, _adapter, _locale, _languageService, informAboutInvalidData);
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
