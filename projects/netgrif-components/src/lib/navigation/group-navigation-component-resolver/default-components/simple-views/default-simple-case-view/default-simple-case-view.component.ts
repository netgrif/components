import {AfterViewInit, Component, Inject, Optional, ViewChild} from '@angular/core';
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
    UserFilterConstants,
    TaskSetDataRequestFields, navigationItemTaskFilterFactory, FilterExtractionService, NAE_NAVIGATION_ITEM_TASK_DATA,
    navigationItemTaskAllowedNetsServiceFactory, BaseAllowedNetsService, NAE_DEFAULT_HEADERS,
    navigationItemCaseViewDefaultHeadersFactory, navigationItemTaskCategoryFactory, CategoryResolverService,
    NAE_DEFAULT_CASE_SEARCH_CATEGORIES, NAE_DEFAULT_TASK_SEARCH_CATEGORIES, groupNavigationViewIdSegmentFactory,
    DataGroup, SearchMode, HeaderMode, extractFieldValueFromData, GroupNavigationConstants, I18nFieldValue,
    extractSearchTypeFromData, SearchComponentConfiguration
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../../../header/header.component';
import {ActivatedRoute} from "@angular/router";

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
            useFactory: navigationItemTaskFilterFactory,
            deps: [FilterExtractionService, ActivatedRoute, [new Optional(), NAE_NAVIGATION_ITEM_TASK_DATA]]
        },
        {
            provide: AllowedNetsService,
            useFactory: navigationItemTaskAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, BaseAllowedNetsService, [new Optional(), NAE_NAVIGATION_ITEM_TASK_DATA]]
        },
        {   provide: NAE_VIEW_ID_SEGMENT, useFactory: groupNavigationViewIdSegmentFactory, deps: [ActivatedRoute]},
        ViewIdService,
        {
            provide: NAE_SEARCH_CATEGORIES,
            useFactory: navigationItemTaskCategoryFactory,
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
        }
    ],
})
export class DefaultSimpleCaseViewComponent extends AbstractCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    additionalFilterData: TaskSetDataRequestFields;
    initialSearchMode: SearchMode;
    showToggleButton: boolean;
    enableSearch: boolean;
    showCreateCaseButton: boolean;
    showDeleteMenu: boolean;
    headersChangeable: boolean;
    headersMode: string[];
    allowTableMode: boolean;
    defaultHeadersMode: HeaderMode;

    constructor(caseViewService: CaseViewService,
                @Inject(NAE_NAVIGATION_ITEM_TASK_DATA) protected _navigationItemTaskData: Array<DataGroup>,
                @Optional() overflowService: OverflowService) {
        // todo 23 create case button as provider
        super(caseViewService, overflowService, undefined, {
            enableCaseTitle: extractFieldValueFromData<boolean>(_navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_TITLE_IN_CREATION),
            isCaseTitleRequired: extractFieldValueFromData<boolean>(_navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_TITLE_IN_CREATION),
            newCaseButtonConfig: {
                createCaseButtonTitle: extractFieldValueFromData<I18nFieldValue>(_navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_TITLE)?.defaultValue,
                createCaseButtonIcon: extractFieldValueFromData<string>(_navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CREATE_CASE_BUTTON_ICON),
                showCreateCaseButton: extractFieldValueFromData<boolean>(_navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_SHOW_CREATE_CASE_BUTTON),
            },
            blockNets: extractFieldValueFromData<string>(_navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_BANNED_PROCESS_CREATION)?.split(','),
        });
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
        this.showCreateCaseButton = this._newCaseCreationConfig.newCaseButtonConfig.showCreateCaseButton;
        this.showDeleteMenu = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_SHOW_MORE_MENU);
        this.headersChangeable = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_HEADERS_CHANGEABLE);
        this.headersMode = viewHeadersMode ? viewHeadersMode : [];
        this.allowTableMode = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_CASE_ALLOW_TABLE_MODE);
        this.defaultHeadersMode = this.resolveHeaderMode(viewDefaultHeadersMode)
        this.additionalFilterData = {
            [UserFilterConstants.ORIGIN_VIEW_ID_FIELD_ID]: {
                type: 'text',
                value: 'override'
            }
        };
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
