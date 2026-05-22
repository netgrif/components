import {AfterViewInit, Component, Inject, Optional, Type, ViewChild} from '@angular/core';
import {
    AbstractCaseViewComponent,
    Case,
    CaseViewService,
    SearchService,
    OverflowService,
    NAE_VIEW_ID_SEGMENT,
    ViewIdService,
    CategoryFactory,
    NAE_SEARCH_CATEGORIES,
    NAE_BASE_FILTER,
    AllowedNetsServiceFactory,
    AllowedNetsService,
    BaseFilter,
    Category,
    navigationItemTaskFilterFactory, FilterExtractionService, NAE_NAVIGATION_ITEM_TASK_DATA,
    navigationItemTaskAllowedNetsServiceFactory, BaseAllowedNetsService, NAE_DEFAULT_HEADERS,
    navigationItemCaseViewDefaultHeadersFactory, navigationItemTaskCategoryFactory, CategoryResolverService,
    NAE_DEFAULT_CASE_SEARCH_CATEGORIES, NAE_DEFAULT_TASK_SEARCH_CATEGORIES, groupNavigationViewIdSegmentFactory,
    DataGroup, SearchMode, HeaderMode, extractFieldValueFromData, GroupNavigationConstants, I18nFieldValue,
    extractSearchTypeFromData, SearchComponentConfiguration, NAE_NEW_CASE_CREATION_CONFIGURATION_DATA,
    navigationItemNewCaseConfigurationFactory, NewCaseCreationConfigurationData
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../../../header/header.component';
import {ActivatedRoute} from "@angular/router";


function baseFilterFactory(extractionService: FilterExtractionService,
                          activatedRoute?: ActivatedRoute,
                          navigationItemTaskData?: Array<DataGroup>): BaseFilter {
    return navigationItemTaskFilterFactory(extractionService, GroupNavigationConstants.ITEM_FIELD_CASE_FILTER, activatedRoute, navigationItemTaskData);
}

function allowedNetsFactory(factory: AllowedNetsServiceFactory,
                            baseAllowedNets: BaseAllowedNetsService,
                            navigationItemTaskData?: Array<DataGroup>): AllowedNetsService {
    return navigationItemTaskAllowedNetsServiceFactory(factory, baseAllowedNets, navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_CASE_FILTER);
}

function searchCategoryFactory(categoryResolverService: CategoryResolverService,
                               navigationItemTaskData?: Array<DataGroup>,
                               defaultCaseSearchCategories?: Array<Type<Category<any>>>,
                               defaultTaskSearchCategories?: Array<Type<Category<any>>>): Array<Type<Category<any>>> {
    return navigationItemTaskCategoryFactory(categoryResolverService, navigationItemTaskData,
        GroupNavigationConstants.ITEM_FIELD_CASE_FILTER, defaultCaseSearchCategories, defaultTaskSearchCategories);
}

@Component({
    selector: 'nc-default-simple-case-view',
    templateUrl: './default-simple-case-view.component.html',
    styleUrls: ['./default-simple-case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [FilterExtractionService, ActivatedRoute, [new Optional(), NAE_NAVIGATION_ITEM_TASK_DATA]]
        },
        {
            provide: AllowedNetsService,
            useFactory: allowedNetsFactory,
            deps: [AllowedNetsServiceFactory, BaseAllowedNetsService, [new Optional(), NAE_NAVIGATION_ITEM_TASK_DATA]]
        },
        {   provide: NAE_VIEW_ID_SEGMENT, useFactory: groupNavigationViewIdSegmentFactory, deps: [ActivatedRoute]},
        ViewIdService,
        {
            provide: NAE_SEARCH_CATEGORIES,
            useFactory: searchCategoryFactory,
            deps: [
                CategoryResolverService,
                [new Optional(), NAE_NAVIGATION_ITEM_TASK_DATA],
                [new Optional(), NAE_DEFAULT_CASE_SEARCH_CATEGORIES],
                [new Optional(), NAE_DEFAULT_TASK_SEARCH_CATEGORIES]
            ]
        },
        {
            provide: NAE_DEFAULT_HEADERS,
            useFactory: navigationItemCaseViewDefaultHeadersFactory,
            deps: [NAE_NAVIGATION_ITEM_TASK_DATA]
        },
        {
            provide: NAE_NEW_CASE_CREATION_CONFIGURATION_DATA,
            useFactory: navigationItemNewCaseConfigurationFactory,
            deps: [NAE_NAVIGATION_ITEM_TASK_DATA]
        }
    ],
})
export class DefaultSimpleCaseViewComponent extends AbstractCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    initialSearchMode: SearchMode;
    showToggleButton: boolean;
    enableSearch: boolean;
    showCreateCaseButton: boolean;
    showDeleteMenu: boolean;
    headersChangeable: boolean;
    headersMode: string[];
    allowTableMode: boolean;
    defaultHeadersMode: HeaderMode;
    emptyContentText: I18nFieldValue;
    emptyContentIcon: string;

    constructor(caseViewService: CaseViewService,
                @Inject(NAE_NAVIGATION_ITEM_TASK_DATA) protected _navigationItemTaskData: Array<DataGroup>,
                @Inject(NAE_NEW_CASE_CREATION_CONFIGURATION_DATA) protected _newCaseCreationConfigurationData: NewCaseCreationConfigurationData,
                @Optional() overflowService: OverflowService) {
        super(caseViewService, overflowService, undefined, _newCaseCreationConfigurationData);
        const searchType = extractSearchTypeFromData(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_VIEW_SEARCH_TYPE);
        const searchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: searchType === SearchMode.ADVANCED,
            initialSearchMode: (searchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
        const viewHeadersMode = extractFieldValueFromData<string[]>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_HEADERS_MODE);
        const viewDefaultHeadersMode = extractFieldValueFromData<string>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_DEFAULT_HEADERS_MODE);

        this.initialSearchMode = searchTypeConfig.initialSearchMode;
        this.showToggleButton = searchTypeConfig.showSearchToggleButton;
        this.enableSearch = searchTypeConfig.initialSearchMode !== undefined;
        this.showCreateCaseButton = this._newCaseCreationConfigurationData.newCaseButtonConfig.showCreateCaseButton;
        this.showDeleteMenu = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_SHOW_MORE_MENU);
        this.headersChangeable = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_HEADERS_CHANGEABLE);
        this.headersMode = viewHeadersMode ? viewHeadersMode : [];
        this.allowTableMode = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_ALLOW_TABLE_MODE);
        this.defaultHeadersMode = this.resolveHeaderMode(viewDefaultHeadersMode)
        this.emptyContentText = extractFieldValueFromData<I18nFieldValue>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_EMPTY_CONTENT_TEXT);
        this.emptyContentIcon = extractFieldValueFromData<string>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_EMPTY_CONTENT_ICON);
    }

    protected resolveHeaderMode(mode: string): HeaderMode {
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

    public isMenuOptionEnabled(option: string): boolean {
        return this.headersMode.some(e => e === option);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
        this.caseHeaderComponent.changeHeadersMode(this.defaultHeadersMode, false);
    }

    public handleCaseClick(clickedCase: Case): void {
    }
}
