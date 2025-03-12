import {AbstractTimeInstanceField} from './models/abstract-time-instance-field';
import {TranslateService} from '@ngx-translate/core';
import moment, {Moment} from 'moment';
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {Component, Inject, OnDestroy, Optional} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {LanguageService} from '../../translate/language.service';
import {Subscription} from 'rxjs';
import {DataField} from "../models/abstract-data-field";
import {FormControl} from "@angular/forms";
import {AbstractTimeInstanceFieldValidation} from "../../registry/validation/model/validation-enums";
import {ValidationRegistryService} from "../../registry/validation/validation-registry.service";

@Component({
    selector: 'ncc-abstract-time-instance-field',
    template: ''
})
export abstract class AbstractTimeInstanceFieldComponent<T extends AbstractTimeInstanceField> extends AbstractBaseDataFieldComponent<T> implements OnDestroy {

    protected _subLang: Subscription;
    protected constructor(protected _translate: TranslateService,
                          protected _validationRegistry: ValidationRegistryService,
                          protected _adapter: DateAdapter<any>,
                          @Inject(MAT_DATE_LOCALE) protected _locale: string,
                          protected _languageService: LanguageService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>) {
        super(_translate, _validationRegistry, dataFieldPortalData);
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

    protected resolveComponentSpecificErrors(field: DataField<any>, formControlRef: FormControl) {
        if (this.formControlRef.hasError(AbstractTimeInstanceFieldValidation.BETWEEN)) {
            const validation = field.validations.find(value =>
                value.name.includes(AbstractTimeInstanceFieldValidation.BETWEEN))
            let left = AbstractTimeInstanceField.parseDate(validation.clientArguments.argument[0].value);
            let right = AbstractTimeInstanceField.parseDate(validation.clientArguments.argument[1].value);
            left = moment.isMoment(left) ? (left as Moment).format('DD.MM.YYYY HH:mm:ss') : left;
            right = moment.isMoment(right) ? (right as Moment).format('DD.MM.YYYY HH:mm:ss') : right;
            if (left === 'past') {
                return this.resolveErrorMessage(validation, AbstractTimeInstanceFieldValidation.BETWEEN,
                    this._translate.instant('dataField.validations.datePast', {right}));
            }
            if (right === 'future') {
                return this.resolveErrorMessage(validation, AbstractTimeInstanceFieldValidation.BETWEEN,
                    this._translate.instant('dataField.validations.dateFuture', {left}));
            }
            return this.resolveErrorMessage(validation, AbstractTimeInstanceFieldValidation.BETWEEN,
                this._translate.instant('dataField.validations.dateRange', {left, right}));
        }
        return undefined;
    }
}
