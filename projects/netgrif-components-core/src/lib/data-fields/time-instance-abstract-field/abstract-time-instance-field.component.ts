import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {AbstractTimeInstanceField, AbstractTimeInstanceFieldValidation} from './models/abstract-time-instance-field';
import {TranslateService} from '@ngx-translate/core';
import moment, {Moment} from 'moment';
import {Component, Inject, Optional} from '@angular/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {LanguageService} from '../../translate/language.service';

@Component({
    selector: 'ncc-abstract-time-instance-field',
    template: ''
})
export abstract class AbstractTimeInstanceFieldComponent extends AbstractDataFieldComponent {

    protected constructor(protected _translate: TranslateService,
                          protected _adapter: DateAdapter<any>,
                          @Inject(MAT_DATE_LOCALE) protected _locale: string,
                          protected _languageService: LanguageService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
        if (this._locale !== this._languageService.getLanguage()) {
            this.setLangToAdapter(this._languageService.getLanguage());
        }
        this._languageService.getLangChange$().subscribe(lang => {
            if (this._locale !== lang) {
                this.setLangToAdapter(lang);
            }
        });
    }

    protected setLangToAdapter(lang: string) {
        this._locale = lang
        this._adapter.setLocale(this._locale);
    }

    public buildErrorMessage(dataField: AbstractTimeInstanceField) {
        if (this.formControl.hasError(AbstractTimeInstanceFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }
        if (this.formControl.hasError(AbstractTimeInstanceFieldValidation.VALID_BETWEEN)) {
            const tmp = dataField.validations.find(value =>
                value.validationRule.includes(AbstractTimeInstanceFieldValidation.BETWEEN)
            ).validationRule.split(' ');
            const parts = tmp[1].split(',');
            let left = AbstractTimeInstanceField.parseDate(parts[0]);
            let right = AbstractTimeInstanceField.parseDate(parts[1]);
            left = moment.isMoment(left) ? (left as Moment).format('DD.MM.YYYY HH:mm:ss') : left;
            right = moment.isMoment(right) ? (right as Moment).format('DD.MM.YYYY HH:mm:ss') : right;
            if (left === 'past') {
                return this.resolveErrorMessage(dataField, AbstractTimeInstanceFieldValidation.BETWEEN,
                    this._translate.instant('dataField.validations.datePast', {right}));
            }
            if (right === 'future') {
                return this.resolveErrorMessage(dataField, AbstractTimeInstanceFieldValidation.BETWEEN,
                    this._translate.instant('dataField.validations.dateFuture', {left}));
            }
            return this.resolveErrorMessage(dataField, AbstractTimeInstanceFieldValidation.BETWEEN,
                this._translate.instant('dataField.validations.dateRange', {left, right}));
        }
        if (this.formControl.hasError(AbstractTimeInstanceFieldValidation.VALID_WORKDAY)) {
            return this.resolveErrorMessage(
                dataField, AbstractTimeInstanceFieldValidation.WORKDAY, this._translate.instant('dataField.validations.workday')
            );
        }
        if (this.formControl.hasError(AbstractTimeInstanceFieldValidation.VALID_WEEKEND)) {
            return this.resolveErrorMessage(
                dataField, AbstractTimeInstanceFieldValidation.WEEKEND, this._translate.instant('dataField.validations.weekend')
            );
        }
        return '';
    }

    protected resolveErrorMessage(dataField: AbstractTimeInstanceField, search: string, generalMessage: string) {
        const validation = dataField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }

}
