import {Component} from '@angular/core';
import {
    PathService,
    AbstractBreadcrumbsComponent, CaseResourceService, DynamicNavigationRouteProviderService, LoggerService
} from '@netgrif/components-core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent extends AbstractBreadcrumbsComponent {

    constructor(_pathService: PathService,
                _caseResourceService: CaseResourceService,
                _activatedRoute: ActivatedRoute,
                _router: Router,
                _dynamicRoutingService: DynamicNavigationRouteProviderService,
                _translateService: TranslateService,
                _log: LoggerService) {
        super(_pathService, _caseResourceService, _activatedRoute, _router, _dynamicRoutingService, _translateService, _log);
    }
}
