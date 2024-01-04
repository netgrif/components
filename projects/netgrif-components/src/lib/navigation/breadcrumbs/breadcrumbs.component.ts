import {Component} from '@angular/core';
import {
    UriService,
    AbstractBreadcrumbsComponent, CaseResourceService
} from '@netgrif/components-core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'nc-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent extends AbstractBreadcrumbsComponent {

    constructor(protected _uriService: UriService,
                _caseResourceService: CaseResourceService,
                _activatedRoute: ActivatedRoute) {
        super(_uriService, _caseResourceService, _activatedRoute);
    }
}
