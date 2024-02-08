import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    AbstractTabbedCaseViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseAllowedNetsService,
    Case,
    CaseViewService,
    CategoryFactory,
    CategoryResolverService,
    Filter,
    FilterExtractionService,
    FilterType,
    HeaderMode,
    LoggerService,
    MergeOperator,
    NAE_BASE_FILTER,
    NAE_DEFAULT_CASE_SEARCH_CATEGORIES,
    NAE_DEFAULT_HEADERS,
    NAE_DEFAULT_TASK_SEARCH_CATEGORIES,
    NAE_SEARCH_CATEGORIES,
    NAE_TAB_DATA,
    SavedFilterMetadata,
    SearchMode,
    SearchService,
    SimpleFilter,
    ViewIdService,
    navigationItemCaseViewDefaultHeadersFactory,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    OverflowService,
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../../header/header.component';
import {
    InjectedTabbedCaseViewDataWithNavigationItemTaskData
} from '../model/injected-tabbed-case-view-data-with-navigation-item-task-data';
import {
    filterCaseTabbedDataAllowedNetsServiceFactory,
    filterCaseTabbedDataFilterFactory,
    filterCaseTabbedDataSearchCategoriesFactory
} from '../model/factory-methods';

@Component({
    selector: 'nc-default-tabbed-case-view',
    templateUrl: './default-tabbed-case-view.component.html',
    styleUrls: ['./default-tabbed-case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        ViewIdService,
        OverflowService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: filterCaseTabbedDataFilterFactory,
            deps: [FilterExtractionService, NAE_TAB_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: filterCaseTabbedDataAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, BaseAllowedNetsService, NAE_TAB_DATA]
        },
        {
            provide: NAE_SEARCH_CATEGORIES,
            useFactory: filterCaseTabbedDataSearchCategoriesFactory,
            deps: [CategoryResolverService, NAE_TAB_DATA, NAE_DEFAULT_CASE_SEARCH_CATEGORIES, NAE_DEFAULT_TASK_SEARCH_CATEGORIES]
        },
        {
            provide: NAE_DEFAULT_HEADERS,
            useFactory: navigationItemCaseViewDefaultHeadersFactory,
            deps: [NAE_NAVIGATION_ITEM_TASK_DATA]
        }
    ]
})
export class DefaultTabbedCaseViewComponent extends AbstractTabbedCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    initialSearchMode: SearchMode;
    showToggleButton: boolean;
    enableSearch: boolean;
    showDeleteMenu: boolean;
    headersChangeable: boolean;
    headersMode: string[];
    allowTableMode: boolean;
    defaultHeadersMode: HeaderMode;

    constructor(caseViewService: CaseViewService,
                loggerService: LoggerService,
                viewIdService: ViewIdService,
                @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedCaseViewDataWithNavigationItemTaskData) {
        super(caseViewService, loggerService, _injectedTabData, undefined, undefined, undefined, _injectedTabData.newCaseButtonConfiguration);

        this.initialSearchMode = _injectedTabData.caseViewSearchTypeConfiguration.initialSearchMode;
        this.showToggleButton = _injectedTabData.caseViewSearchTypeConfiguration.showSearchToggleButton;
        this.enableSearch = _injectedTabData.caseViewSearchTypeConfiguration.initialSearchMode !== undefined;
        this.showDeleteMenu = _injectedTabData.caseViewShowMoreMenu;
        this.headersChangeable = _injectedTabData.caseViewHeadersChangeable;
        this.headersMode = _injectedTabData.caseViewHeadersMode ? _injectedTabData.caseViewHeadersMode : [];
        this.allowTableMode = this._injectedTabData.caseViewAllowTableMode;
        this.defaultHeadersMode = this.resolveHeaderMode(_injectedTabData.caseViewDefaultHeadersMode);

        if (!this.allowTableMode) {
            const viewId = viewIdService.viewId;
            localStorage.setItem(viewId + '-overflowMode', 'false');
        }
    }

    ngAfterViewInit(): void {
        super.initializeHeader(this.caseHeaderComponent);
        this.caseHeaderComponent.changeHeadersMode(this.defaultHeadersMode, false);
    }

    loadFilter(filterData: SavedFilterMetadata) {
        this._injectedTabData.tabViewRef.openTab({
            label: {
                text: filterData.filter.title
            },
            canBeClosed: true,
            tabContentComponent: DefaultTabbedCaseViewComponent,
            injectedObject: {...this._injectedTabData, filterCase: filterData.filterCase},
            order: this._injectedTabData.tabViewOrder,
            parentUniqueId: this._injectedTabData.tabUniqueId
        }, this._autoswitchToTaskTab, this._openExistingTab);
    }

    protected openTab(openCase: Case) {
        this._injectedTabData.tabViewRef.openTab({
            label: {
                text: openCase.title,
                icon: openCase.icon ? openCase.icon : 'check_box'
            },
            canBeClosed: true,
            tabContentComponent: this._injectedTabData.tabViewComponent,
            injectedObject: {
                baseFilter: this.resolveFilter(openCase),
                allowedNets: this.resolveAllowedNets(openCase),
                navigationItemTaskData: this._injectedTabData.navigationItemTaskData,
                searchTypeConfiguration: this._injectedTabData.taskViewSearchTypeConfiguration,
                showMoreMenu: this._injectedTabData.taskViewShowMoreMenu,
                headersChangeable: this._injectedTabData.taskViewHeadersChangeable,
                headersMode: this._injectedTabData.taskViewHeadersMode,
                allowTableMode: this._injectedTabData.taskViewAllowTableMode,
                defaultHeadersMode: this._injectedTabData.taskViewDefaultHeadersMode
            },
            order: this._injectedTabData.tabViewOrder,
            parentUniqueId: this._injectedTabData.tabUniqueId
        }, this._autoswitchToTaskTab, this._openExistingTab);
    }

    private resolveFilter(openCase: Case): Filter {
        const additionalFilter = this._injectedTabData.taskViewAdditionalFilter;
        const mergeFilters = this._injectedTabData.taskViewMergeWithBaseFilter;
        const baseFilter = new SimpleFilter('', FilterType.TASK, {case: {id: `${openCase.stringId}`}});

        let filter;
        if (additionalFilter === undefined) {
            filter = baseFilter;
        } else {
            if (mergeFilters) {
                filter = additionalFilter.merge(baseFilter, MergeOperator.AND);
            } else {
                filter = additionalFilter;
            }
        }

        return filter;
    }

    private resolveAllowedNets(openCase: Case): string[] {
        const additionalFilter = this._injectedTabData.taskViewAdditionalFilter;
        if (additionalFilter == undefined) {
            return [openCase.processIdentifier];
        }

        const mergeFilters = this._injectedTabData.taskViewMergeWithBaseFilter;
        const additionalAllowedNets = this._injectedTabData.taskViewAdditionalAllowedNets ? this._injectedTabData.taskViewAdditionalAllowedNets : [];

        return mergeFilters ? [openCase.processIdentifier, ...additionalAllowedNets] : additionalAllowedNets
    }

    isMenuOptionEnabled(option: string): boolean {
        return this.headersMode.some(e => e === option);
    }

    private resolveHeaderMode(mode: string): HeaderMode {
        switch (mode) {
            case 'sort':
                return HeaderMode.SORT;
            case 'edit':
                return HeaderMode.EDIT;
            case 'search':
                return HeaderMode.SEARCH;
            default:
                return undefined;
        }
    }
}
