import {Component, Injector} from '@angular/core';
import {
    AbstractHeaderComponent,
    CaseHeaderService,
    CategoryFactory,
    HeaderSearchService,
    TaskHeaderService,
    WorkflowHeaderService
} from '@netgrif/application-engine';

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
    constructor(protected _injector: Injector) {
        super(_injector);
    }
}
