import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {AbstractI18nFieldComponent, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-i18n-field',
    templateUrl: './i18n-field.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class I18nFieldComponent extends AbstractI18nFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
