import {Component} from '@angular/core';
import {LanguageService, AbstractLanguageSelectorComponent} from '@netgrif/application-engine';

@Component({
    selector: 'nc-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent extends AbstractLanguageSelectorComponent {
    constructor(protected _select: LanguageService) {
        super(_select);
    }
}
