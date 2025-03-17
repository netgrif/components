import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractI18nDividerFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    I18nField
} from '@netgrif/components-core';

@Component({
    selector: 'nc-i18n-divider-field',
    templateUrl: './i18n-divider-field.component.html',
    styleUrls: ['./i18n-divider-field.component.scss'],
    standalone: false
})
export class I18nDividerFieldComponent extends AbstractI18nDividerFieldComponent {
    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<I18nField>) {
        super(dataFieldPortalData);
    }
}
