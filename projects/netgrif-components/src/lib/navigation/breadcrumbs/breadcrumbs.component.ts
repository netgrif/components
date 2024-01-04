import {Component} from '@angular/core';
import {
    UriService,
    AbstractBreadcrumbsComponent, CaseResourceService
} from '@netgrif/components-core';

@Component({
    selector: 'nc-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent extends AbstractBreadcrumbsComponent {

    constructor(protected _uriService: UriService,
                _caseResourceService: CaseResourceService) {
        super(_uriService, _caseResourceService);
    }
}
