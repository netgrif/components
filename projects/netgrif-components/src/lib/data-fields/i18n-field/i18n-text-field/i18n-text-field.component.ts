import {Component} from '@angular/core';
import {AbstractI18nTextFieldComponent} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-i18n-text-field',
    templateUrl: './i18n-text-field.component.html',
    styleUrls: ['./i18n-text-field.component.scss']
})
export class I18nTextFieldComponent extends AbstractI18nTextFieldComponent {
    constructor(translateService: TranslateService) {
        super(translateService);
    }
}
