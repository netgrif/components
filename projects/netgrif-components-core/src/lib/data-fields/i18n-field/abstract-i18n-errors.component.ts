import {TranslateService} from '@ngx-translate/core';
import {I18nField} from './models/i18n-field';
import {Component, Inject, Optional} from '@angular/core';
import {LanguageIconsService} from './language-icons.service';
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {DataField} from "../models/abstract-data-field";
import {FormControl} from "@angular/forms";
import {I18nFieldValidation} from "../../registry/validation/model/validation-enums";
import {ValidationRegistryService} from "../../registry/validation/validation-registry.service";

@Component({
    selector: 'ncc-abstract-i18n-errors',
    template: ''
})
export abstract class AbstractI18nErrorsComponent extends AbstractBaseDataFieldComponent<I18nField> {

    protected constructor(protected languageIconsService: LanguageIconsService,
                          protected _translate: TranslateService,
                          protected _validationRegistry: ValidationRegistryService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<I18nField>) {
        super(_translate, _validationRegistry, dataFieldPortalData);
    }

    resolveComponentSpecificErrors(field: DataField<any>, formControlRef: FormControl) {
        if (formControlRef.hasError(I18nFieldValidation.REQUIRED_I18N)) {
            return this._translate.instant('dataField.validations.requiredI18n');
        }
        if (formControlRef.hasError(I18nFieldValidation.TRANSLATION_REQUIRED)) {
            const validation = field.validations.find(value =>
                value.name === I18nFieldValidation.TRANSLATION_REQUIRED);
            const missingLanguages = validation.clientArguments.argument.map(item => item.value)
                .filter(lanCode => !Object.keys(this.formControlRef.value?.translations ?? []).includes(lanCode))
                .map(lanCode => this.languageIconsService.languageIcons[lanCode].languageName)
                .join(', ');
            return this.resolveErrorMessage(validation,
                I18nFieldValidation.TRANSLATION_REQUIRED,
                this._translate.instant(
                    'dataField.validations.translationRequired',
                    {translation: missingLanguages}
                )
            );
        }
        if (formControlRef.hasError(I18nFieldValidation.TRANSLATION_ONLY)) {
            const validation = field.validations.find(value =>
                value.name === I18nFieldValidation.TRANSLATION_ONLY);
            const onlyLanguages = validation.clientArguments.argument.map(item => item.value)
                .map(lanCode => this.languageIconsService.languageIcons[lanCode].languageName)
                .join(', ');
            return this.resolveErrorMessage(validation,
                I18nFieldValidation.TRANSLATION_ONLY,
                this._translate.instant(
                    'dataField.validations.translationOnly',
                    {translation: onlyLanguages}
                )
            );
        }
        return undefined;
    }
}
