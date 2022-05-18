import {SafeHtml} from '@angular/platform-browser';

export interface LanguageIcons {
    [k: string]: LanguageIconValue;
}

export interface LanguageIconValue {
    languageName: string;
    svgIcon: SafeHtml;
}
