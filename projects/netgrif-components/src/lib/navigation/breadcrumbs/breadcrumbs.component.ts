import {Component} from '@angular/core';
import {
    UriService,
    AbstractBreadcrumbsComponent
} from '@netgrif/components-core';

@Component({
    selector: 'nc-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent extends AbstractBreadcrumbsComponent {

    constructor(protected _uriService: UriService) {
        super(_uriService);
    }
}
