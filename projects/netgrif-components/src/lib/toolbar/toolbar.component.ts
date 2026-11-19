import {Component, ChangeDetectionStrategy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AbstractToolbarComponent, LanguageService, RedirectService, UserService} from '@netgrif/components-core';
import {Router} from '@angular/router';

@Component({
    selector: 'nc-toolbar',
    templateUrl: './toolbar.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ToolbarComponent extends AbstractToolbarComponent {
    /** the logo that could not be loaded, it is not shown */
    public failedLogo: string;

    constructor(protected translate: TranslateService, protected selectLangService: LanguageService,
                protected userService: UserService, protected router: Router, protected redirectService: RedirectService) {
        super(translate, selectLangService, userService, router, redirectService);
    }
}
