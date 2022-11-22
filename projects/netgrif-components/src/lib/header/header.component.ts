import {Component, Injector, Optional} from '@angular/core';
import {
    AbstractHeaderComponent,
    CaseHeaderService,
    CategoryFactory,
    HeaderSearchService,
    TaskHeaderService,
    WorkflowHeaderService,
    OverflowService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [
        CaseHeaderService,
        TaskHeaderService,
        WorkflowHeaderService,
        HeaderSearchService,
        CategoryFactory
    ]
})
export class HeaderComponent extends AbstractHeaderComponent {

    constructor(injector: Injector,
                translate: TranslateService,
                @Optional() overflowService: OverflowService) {
        super(injector, translate, overflowService);
    }
}
