import {Component, Inject, Optional} from '@angular/core';
import {AbstractI18nFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

@Component({
    selector: 'nc-i18n-field',
    templateUrl: './i18n-field.component.html',
    styleUrls: ['./i18n-field.component.scss']
})
export class I18nFieldComponent extends AbstractI18nFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
