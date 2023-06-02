import {TranslateService} from '@ngx-translate/core';
import {I18nField, I18nFieldValidation} from './models/i18n-field';
import {Component, Inject, Input, Optional} from '@angular/core';
import {LanguageIconsService} from './language-icons.service';
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {ValidationRegistryService} from "../../registry/validation-registry.service";


@Component({
    selector: 'ncc-abstract-i18n-errors',
    template: ''
})
export abstract class AbstractI18nErrorsComponent extends AbstractBaseDataFieldComponent<I18nField> {


    protected constructor(protected languageIconsService: LanguageIconsService,
                          _translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<I18nField>,
                          _validationRegistry: ValidationRegistryService) {
        super(_translate, dataFieldPortalData, _validationRegistry);
    }
}
