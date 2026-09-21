import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    CaseViewService,
    CategoryFactory,
    defaultCaseSearchCategoriesFactory,
    InjectedTabbedCaseViewData,
    LoggerService,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    SearchService,
    SimpleFilter,
    AbstractTabbedCaseViewComponent,
    ViewIdService,
    Filter,
    FilterType,
    NAE_BASE_FILTER,
    AllowedNetsServiceFactory, SavedFilterMetadata, AllowedNetsService
} from '@netgrif/components-core';
import {HeaderComponent} from '@netgrif/components';
import {Subject} from 'rxjs';

interface ExampleInjectedData extends InjectedTabbedCaseViewData {
    exampleUseCache: boolean;
}

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createFromConfig('demo-title-config');
};

const baseFilterFactory = (injectedData: ExampleInjectedData) => {
    if (!injectedData.loadFilter) {
        const filter = new Subject<Filter>();
        setTimeout(() => {
            filter.next(SimpleFilter.fromCaseQuery({
                process: {
                    identifier: 'all_data'
                }
            }));
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

@Component({
    selector: 'nae-app-demo-title-config-content3-case-view',
    templateUrl: './demo-title-config-content3-case-view.component.html',
    styleUrls: ['./demo-title-config-content3-case-view.component.scss'],
    providers: [
        CategoryFactory,
        SearchService,
        CaseViewService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [NAE_TAB_DATA]
        },
        {   provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]},
        ViewIdService,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
    ]
})
export class DemoTitleConfigContent3CaseViewComponent extends AbstractTabbedCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedCaseViewData) {
        super(caseViewService, loggerService, injectedTabData, undefined, undefined, undefined, {
            enableCaseTitle: true,
            isCaseTitleRequired: false
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
            tabContentComponent: DemoTitleConfigContent3CaseViewComponent,
            injectedObject: {...this._injectedTabData, loadFilter: filterData.filter},
            order: this._injectedTabData.tabViewOrder,
            parentUniqueId: this._injectedTabData.tabUniqueId
        }, this._autoswitchToTaskTab, this._openExistingTab);
    }

    saveFilter(filterData: SavedFilterMetadata) {
        console.log(filterData);
    }

}
