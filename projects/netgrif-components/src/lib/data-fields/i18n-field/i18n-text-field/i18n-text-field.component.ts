import {Component, ViewEncapsulation} from '@angular/core';
import {AbstractI18nTextFieldComponent, LanguageIconsService} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'nc-i18n-text-field',
    templateUrl: './i18n-text-field.component.html',
    styleUrls: ['./i18n-text-field.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('languageWrapper', [
            state('true', style({
                transform: 'scaleY(1)'
            })),
            state('false', style({
                transform: 'scaleY(0)'
            })),
            transition('true => false', [
                animate('0.1s')
            ]),
            transition('false => true', [
                animate('0.1s')
            ]),
        ])
    ]
})
export class I18nTextFieldComponent extends AbstractI18nTextFieldComponent {
    constructor(languageIconsService: LanguageIconsService, translateService: TranslateService, domSanitizer: DomSanitizer) {
        super(languageIconsService, translateService, domSanitizer);
    }
}
