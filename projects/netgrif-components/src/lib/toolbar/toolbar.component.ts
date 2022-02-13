import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractToolbarComponent, LanguageService} from '@netgrif/components-core';

@Component({
    selector: 'nc-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent extends AbstractToolbarComponent {

    constructor(protected translate: TranslateService, protected selectLangService: LanguageService) {
        super(translate, selectLangService);
    }
}
