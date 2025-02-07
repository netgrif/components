import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractToolbarComponent, LanguageService, UserService} from '@netgrif/components-core';
import {Router} from '@angular/router';

@Component({
    selector: 'nc-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent extends AbstractToolbarComponent {

    constructor(protected translate: TranslateService, protected selectLangService: LanguageService,
                protected userService: UserService, protected router: Router) {
        super(translate, selectLangService, userService, router);
    }
}
