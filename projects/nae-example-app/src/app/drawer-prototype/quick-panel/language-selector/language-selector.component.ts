import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'nae-app-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

    @Input() public language: string;

    /**
     * ISO 639-1
     */
    public langMenuItems = {
        'sk-SK': 'Slovak',
        'en-GB': 'English'
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    get flagCountryCode(): string {
        return this.flagCode(this.language);
    }

    flagCode(languageCode: string): string {
        if (languageCode.includes('-')) {
            return languageCode.split('-')[1].toLowerCase();
        }
        return languageCode.toLowerCase();
    }

}
