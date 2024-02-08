import {AbstractTimeInstanceField, AbstractTimeInstanceFieldValidation} from './models/abstract-time-instance-field';
import {TranslateService} from '@ngx-translate/core';
import moment, {Moment} from 'moment';
import {Component, Inject, Optional} from '@angular/core';
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {Component, Inject, OnDestroy, Optional} from '@angular/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {LanguageService} from '../../translate/language.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'ncc-abstract-time-instance-field',
    template: ''
})
export abstract class AbstractTimeInstanceFieldComponent<T extends AbstractTimeInstanceField> extends AbstractBaseDataFieldComponent<T> implements OnDestroy {

    protected _subLang: Subscription;
    protected constructor(protected _translate: TranslateService,
                          protected _adapter: DateAdapter<any>,
                          @Inject(MAT_DATE_LOCALE) protected _locale: string,
                          protected _languageService: LanguageService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(dataFieldPortalData);
        if (this._locale !== this._languageService.getLanguage()) {
            this.setLangToAdapter(this._languageService.getLanguage());
        }
        this._subLang = this._languageService.getLangChange$().subscribe(lang => {
            if (this._locale !== lang) {
                this.setLangToAdapter(lang);
            }
        });
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._subLang.unsubscribe();
    }

    public setLangToAdapter(lang: string) {
        this._locale = lang
        this._adapter.setLocale(this._locale);
    }

    public buildErrorMessage(dataField: AbstractTimeInstanceField) {
        if (this.formControlRef.hasError(AbstractTimeInstanceFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }
        if (this.formControlRef.hasError(AbstractTimeInstanceFieldValidation.VALID_BETWEEN)) {
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
        if (this.formControlRef.hasError(AbstractTimeInstanceFieldValidation.VALID_WORKDAY)) {
            return this.resolveErrorMessage(
                dataField, AbstractTimeInstanceFieldValidation.WORKDAY, this._translate.instant('dataField.validations.workday')
            );
        }
        if (this.formControlRef.hasError(AbstractTimeInstanceFieldValidation.VALID_WEEKEND)) {
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
