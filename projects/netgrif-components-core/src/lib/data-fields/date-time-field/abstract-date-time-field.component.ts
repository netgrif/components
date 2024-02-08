import {Component, Inject, Input, Optional} from '@angular/core';
import {DateTimeField} from './models/date-time-field';
import {AbstractTimeInstanceFieldComponent} from '../time-instance-abstract-field/abstract-time-instance-field.component';
import {TranslateService} from '@ngx-translate/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {LanguageService} from '../../translate/language.service';
import {NgxMatDateAdapter} from '@angular-material-components/datetime-picker';

@Component({
    selector: 'ncc-abstract-date-time-field',
    template: ''
})
export abstract class AbstractDateTimeFieldComponent extends AbstractTimeInstanceFieldComponent {

    @Input() public dataField: DateTimeField;

    protected constructor(protected _translate: TranslateService,
                          protected _adapter: NgxMatDateAdapter<any>,
                          @Inject(MAT_DATE_LOCALE) protected _locale: string,
                          protected _languageService: LanguageService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(_translate, _adapter, _locale, _languageService, informAboutInvalidData);
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
