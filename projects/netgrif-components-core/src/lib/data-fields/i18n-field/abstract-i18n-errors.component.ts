import {TranslateService} from '@ngx-translate/core';
import {I18nField, I18nFieldValidation} from './models/i18n-field';
import {Component, Inject, Optional} from '@angular/core';
import {LanguageIconsService} from './language-icons.service';
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {NAE_SAVE_DATA_INFORM} from "../models/save-data-inform-token";


@Component({
    selector: 'ncc-abstract-i18n-errors',
    template: ''
})
export abstract class AbstractI18nErrorsComponent extends AbstractBaseDataFieldComponent<I18nField> {


    protected constructor(protected languageIconsService: LanguageIconsService,
                          protected _translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<I18nField>,
                          @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean) {
        super(dataFieldPortalData, _saveDataInform);
    }

    getErrorMessage() {
        if (this.formControlRef.hasError(I18nFieldValidation.REQUIRED_I18N)) {
            return this._translate.instant('dataField.validations.requiredI18n');
        }
        if (this.formControlRef.hasError(I18nFieldValidation.TRANSLATION_REQUIRED)) {
            const tmp = this.dataField.validations.find(value =>
                value.validationRule.includes(I18nFieldValidation.TRANSLATION_REQUIRED)
            ).validationRule.split(' ');
            const missingLanguages = tmp[1]
                .replace(' ', '')
                .split(',')
                .filter(lanCode => !Object.keys(this.formControlRef.value.translations).includes(lanCode))
                .map(lanCode => this.languageIconsService.languageIcons[lanCode].languageName)
                .join(', ');
            return this.resolveErrorMessage(
                I18nFieldValidation.TRANSLATION_REQUIRED,
                this._translate.instant(
                    'dataField.validations.translationRequired',
                    {translation: missingLanguages}
                )
            );
        }
        if (this.formControlRef.hasError(I18nFieldValidation.TRANSLATION_ONLY)) {
            const tmp = this.dataField.validations.find(value =>
                value.validationRule.includes(I18nFieldValidation.TRANSLATION_ONLY)
            ).validationRule.split(' ');
            const onlyLanguages = tmp[1]
                .replace(' ', '')
                .split(',')
                .map(lanCode => this.languageIconsService.languageIcons[lanCode].languageName)
                .join(', ');
            return this.resolveErrorMessage(
                I18nFieldValidation.TRANSLATION_ONLY,
                this._translate.instant(
                    'dataField.validations.translationOnly',
                    {translation: onlyLanguages}
                )
            );
        }
        return '';
    }

    protected resolveErrorMessage(search: string, generalMessage: string) {
        const validation = this.dataField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }
}
