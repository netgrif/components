import {TranslateService} from '@ngx-translate/core';
import {FormControl} from '@angular/forms';
import {I18nField, I18nFieldValidation} from './models/i18n-field';
import {Input} from '@angular/core';
import {WrappedBoolean} from '../data-field-template/models/wrapped-boolean';
import {LanguageIconsService} from './language-icons.service';

export abstract class AbstractI18nErrorsComponent {

    @Input() showLargeLayout: WrappedBoolean;
    @Input() formControlRef: FormControl;
    @Input() textI18nField: I18nField;

    protected constructor(public languageIconsService: LanguageIconsService,
                          protected _translate: TranslateService) {
    }

    getErrorMessage() {
        if (this.formControlRef.hasError(I18nFieldValidation.REQUIRED_I18N)) {
            return this._translate.instant('dataField.validations.requiredI18n');
        }
        if (this.formControlRef.hasError(I18nFieldValidation.TRANSLATION_REQUIRED)) {
            const tmp = this.textI18nField.validations.find(value =>
                value.validationRule.includes(I18nFieldValidation.TRANSLATION_REQUIRED)
            ).validationRule.split(' ');
            const missingLanguages = tmp[1]
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
            const tmp = this.textI18nField.validations.find(value =>
                value.validationRule.includes(I18nFieldValidation.TRANSLATION_ONLY)
            ).validationRule.split(' ');
            const onlyLanguages = tmp[1]
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
        const validation = this.textI18nField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }
}
