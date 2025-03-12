import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractI18nDividerFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    I18nField, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-i18n-divider-field',
    templateUrl: './i18n-divider-field.component.html',
    styleUrls: ['./i18n-divider-field.component.scss']
})
export class I18nDividerFieldComponent extends AbstractI18nDividerFieldComponent {
    constructor(translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<I18nField>) {
        super(translate, validationRegistry, dataFieldPortalData);
    }
}
