import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {
    AbstractDashboardComponent,
    CaseResourceService,
    DoubleDrawerNavigationService,
    LanguageService,
    LoggerService,
    UriService
} from '@netgrif/components-core';


@Component({
    selector: 'nc-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AbstractDashboardComponent {


    constructor(
        protected _caseResource: CaseResourceService,
        protected _log: LoggerService,
        protected _uriService: UriService,
        protected _router: Router,
        protected _languageService: LanguageService,
        protected _doubleDrawerNavigationService: DoubleDrawerNavigationService
    ) {
        super(_caseResource, _log, _uriService, _router, _languageService, _doubleDrawerNavigationService);
    }
}
