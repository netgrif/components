import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CaseViewService,
    CategoryFactory,
    defaultCaseSearchCategoriesFactory,
    FilterType,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    SearchService,
    SimpleFilter,
    AbstractTabbedCaseViewComponent,
    ViewIdService,
    Filter,
    NAE_NEW_CASE_CONFIGURATION,
    NAE_BASE_FILTER, AllowedNetsServiceFactory, AllowedNetsService, SavedFilterMetadata, OverflowService, UserService
} from '@netgrif/components-core';
import {HeaderComponent} from '@netgrif/components';
import {Subject} from 'rxjs';

interface ExampleInjectedData extends InjectedTabbedCaseViewData {
    exampleUseCache: boolean;
    loadFilter?: Filter;
}

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createWithAllNets();
};

const baseFilterFactory = (injectedData: ExampleInjectedData) => {
    if (!injectedData.loadFilter) {
        const filter = new Subject<Filter>();
        setTimeout(() => {
            filter.next(SimpleFilter.emptyCaseFilter());
        }, 1000);
        return {
            filter: filter.asObservable(),
            filterType: FilterType.CASE
        };
    } else {
        return {
            filter: injectedData.loadFilter
        };
    }
};

const newCaseConfigFactory = (injectedTabData: ExampleInjectedData) => {
    return {useCachedProcesses: injectedTabData.exampleUseCache};
};

@Component({
    selector: 'nae-app-tabbed-case-view',
    templateUrl: './tabbed-case-view.component.html',
    styleUrls: ['./tabbed-case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        ViewIdService,
        {   provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [NAE_TAB_DATA]},
        {   provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
        {provide: NAE_NEW_CASE_CONFIGURATION, useFactory: newCaseConfigFactory, deps: [NAE_TAB_DATA]}
    ]
})
export class TabbedCaseViewComponent extends AbstractTabbedCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                overflowService: OverflowService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData) {
        super(caseViewService, loggerService, injectedTabData, overflowService, undefined, undefined, {
            enableCaseTitle: true,
            isCaseTitleRequired: true
        });
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
    }

    loadFilter(filterData: SavedFilterMetadata) {
        this._injectedTabData.tabViewRef.openTab({
            label: {
                text: filterData.filter.title
            },
            canBeClosed: true,
            tabContentComponent: TabbedCaseViewComponent,
            injectedObject: {...this._injectedTabData, loadFilter: filterData.filter},
            order: this._injectedTabData.tabViewOrder,
            parentUniqueId: this._injectedTabData.tabUniqueId
        }, this._autoswitchToTaskTab, this._openExistingTab);
    }

    saveFilter(filterData: SavedFilterMetadata) {
        console.log(filterData);
    }

}
