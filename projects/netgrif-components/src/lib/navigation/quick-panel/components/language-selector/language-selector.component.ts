import {Component} from '@angular/core';
import {AbstractLanguageSelectorComponent, LanguageService, LanguageIconsService} from '@netgrif/components-core';

@Component({
    selector: 'nc-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
    standalone: false
})
export class LanguageSelectorComponent extends AbstractLanguageSelectorComponent {
    constructor(protected _langService: LanguageService, protected _languageIconsService: LanguageIconsService) {
        super(_langService, _languageIconsService);
    }

}
