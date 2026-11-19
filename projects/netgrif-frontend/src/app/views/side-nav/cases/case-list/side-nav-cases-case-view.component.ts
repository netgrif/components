import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, ViewChild} from '@angular/core';
import {
    AbstractTabbedCaseViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    CaseViewService,
    CategoryFactory,
    defaultCaseSearchCategoriesFactory,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_BASE_FILTER,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    OverflowService,
    SearchService,
    SimpleFilter,
    ViewIdService
} from '@netgrif/components-core';
import {HeaderComponent} from '@netgrif/components';
import {TranslateService} from '@ngx-translate/core';

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createWithAllNets();
};

const baseFilterFactory = () => {
    return {
        filter: SimpleFilter.emptyCaseFilter()
    };
};

/**
 * Cases of all processes (the first tab of {@link CasesViewComponent}), a click on a case opens its tasks in a new tab.
 */
@Component({
    selector: 'app-side-nav-cases-case-view',
    templateUrl: './side-nav-cases-case-view.component.html',
    styleUrls: ['./side-nav-cases-case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        ViewIdService,
        {provide: NAE_BASE_FILTER, useFactory: baseFilterFactory},
        {provide: AllowedNetsService, useFactory: localAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]}
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SideNavCasesCaseViewComponent extends AbstractTabbedCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                overflowService: OverflowService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData,
                translateService: TranslateService) {
        super(caseViewService, loggerService, injectedTabData, overflowService, undefined, undefined, {
            enableCaseTitle: true,
            isCaseTitleRequired: false,
            newCaseButtonConfig: {
                createCaseButtonTitle: translateService.instant('side-menu.new-case.case'),
                createCaseButtonIcon: 'add'
            }
        });
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }
}
