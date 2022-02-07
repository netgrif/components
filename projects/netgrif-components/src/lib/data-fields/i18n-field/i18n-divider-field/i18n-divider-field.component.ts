import {Component} from '@angular/core';
import {AbstractI18nDividerFieldComponent} from '@netgrif/components-core';

@Component({
    selector: 'nc-i18n-divider-field',
    templateUrl: './i18n-divider-field.component.html',
    styleUrls: ['./i18n-divider-field.component.scss']
})
export class I18nDividerFieldComponent extends AbstractI18nDividerFieldComponent {
    constructor() {
        super();
    }
}
