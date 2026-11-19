import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {
    AbstractI18nTextFieldComponent,
    LanguageIconsService,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    I18nField
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'nc-i18n-text-field',
    templateUrl: './i18n-text-field.component.html',
    styleUrls: ['./i18n-text-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class I18nTextFieldComponent extends AbstractI18nTextFieldComponent {
    constructor(languageIconsService: LanguageIconsService, translateService: TranslateService, domSanitizer: DomSanitizer,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<I18nField>) {
        super(languageIconsService, translateService, domSanitizer, dataFieldPortalData);
    }
}
