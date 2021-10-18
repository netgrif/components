import {Component} from '@angular/core';
import {AbstractI18nTextFieldComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-i18n-text-field',
    templateUrl: './i18n-text-field.component.html',
    styleUrls: ['./i18n-text-field.component.scss']
})
export class I18nTextFieldComponent extends AbstractI18nTextFieldComponent {
    constructor() {
        super();
    }
}
