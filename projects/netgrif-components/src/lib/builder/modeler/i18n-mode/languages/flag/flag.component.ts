import {Component, Input} from '@angular/core';
import {Locale} from '../../classes/locale';
import {SafeHtml} from "@angular/platform-browser";
import {LanguageIconsService} from "@netgrif/components-core";

@Component({
    selector: 'nc-builder-flag',
    templateUrl: './flag.component.html',
    styleUrls: ['./flag.component.scss'],
})
export class FlagComponent {

    private _locale: Locale;

    constructor(protected _languageIconsService: LanguageIconsService) {
    }

    @Input()
    set locale(value: Locale) {
        this._locale = value;
    }

    get languageCode(): string {
        return this._locale.languageCode.toLowerCase();
    }

    get name(): string {
        return this._locale.country;
    }

    public getLangIcon(lang: string): SafeHtml {
        return this._languageIconsService.languageIcons[lang]?.svgIcon ?? this._languageIconsService.languageIcons['xx']?.svgIcon;
    }
}
