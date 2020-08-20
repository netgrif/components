import {Component, Injector} from '@angular/core';
import {
    HeaderSearchService,
    CategoryFactory,
    WorkflowHeaderService,
    TaskHeaderService,
    CaseHeaderService,
    AbstractHeaderComponent
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
