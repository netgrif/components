import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractI18nFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA,
    NAE_SAVE_DATA_INFORM
} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-i18n-field',
    templateUrl: './i18n-field.component.html',
    styleUrls: ['./i18n-field.component.scss']
})
export class I18nFieldComponent extends AbstractI18nFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) saveDataInform: boolean | null) {
        super(informAboutInvalidData, saveDataInform);
    }
}
