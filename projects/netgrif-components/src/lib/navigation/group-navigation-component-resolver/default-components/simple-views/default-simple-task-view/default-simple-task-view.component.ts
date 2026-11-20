import {AfterViewInit, Component, Inject, Optional, ViewChild} from '@angular/core';
import {
    SearchService,
    AllowedNetsService,
    ViewIdService,
    AbstractTaskViewComponent,
    TaskViewService,
    CategoryFactory,
    NAE_BASE_FILTER,
    AllowedNetsServiceFactory,
    NAE_SEARCH_CATEGORIES,
    navigationItemTaskFilterFactory,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    navigationItemTaskAllowedNetsServiceFactory,
    NAE_VIEW_ID_SEGMENT,
    groupNavigationViewIdSegmentFactory,
    NAE_DEFAULT_TASK_SEARCH_CATEGORIES,
    BaseAllowedNetsService,
    FilterExtractionService,
    ChangedFieldsService,
    BaseFilter,
    FilterType,
    SearchMode, extractSearchTypeFromData, extractFieldValueFromData, SearchComponentConfiguration,
    GroupNavigationConstants, HeaderMode, DataGroup, NAE_DEFAULT_HEADERS, I18nFieldValue,
    navigationItemTaskViewDefaultHeadersFactory, NAE_DYNAMIC_DEFAULT_SORT, ProcessService
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../../../header/header.component';
import {ActivatedRoute} from '@angular/router';
import {buildDynamicSortChangeDescriptionForTask$} from "../../model/factory-methods";

function baseFilterFactory(extractionService: FilterExtractionService,
                           activatedRoute?: ActivatedRoute,
                           navigationItemTaskData?: Array<DataGroup>): BaseFilter {
    return navigationItemTaskFilterFactory(extractionService, GroupNavigationConstants.ITEM_FIELD_TASK_FILTER, activatedRoute,
        navigationItemTaskData, undefined, FilterType.TASK);
}

function allowedNetsFactory(factory: AllowedNetsServiceFactory,
                            baseAllowedNets: BaseAllowedNetsService,
                            navigationItemTaskData?: Array<DataGroup>): AllowedNetsService {
    return navigationItemTaskAllowedNetsServiceFactory(factory, baseAllowedNets, false, navigationItemTaskData);
}

@Component({
    selector: 'nc-default-simple-task-view',
    templateUrl: './default-simple-task-view.component.html',
    styleUrls: ['./default-simple-task-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ViewIdService,
        ChangedFieldsService,
        {
            provide: NAE_DYNAMIC_DEFAULT_SORT,
            useFactory: buildDynamicSortChangeDescriptionForTask$,
            deps: [NAE_NAVIGATION_ITEM_TASK_DATA, ProcessService]
        },
        {   provide: NAE_VIEW_ID_SEGMENT, useFactory: groupNavigationViewIdSegmentFactory, deps: [ActivatedRoute]},
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
        {
            provide: NAE_DEFAULT_HEADERS,
            useFactory: navigationItemTaskViewDefaultHeadersFactory,
            deps: [NAE_NAVIGATION_ITEM_TASK_DATA]
        },
        {   provide: NAE_SEARCH_CATEGORIES,
            useExisting: NAE_DEFAULT_TASK_SEARCH_CATEGORIES
        },
    ]
})
export class DefaultSimpleTaskViewComponent extends AbstractTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    public searchEnabled: boolean = true;
    initialSearchMode: SearchMode;
    showToggleButton: boolean;
    headersChangeable: boolean;
    headersMode: string[];
    allowTableMode: boolean;
    defaultHeadersMode: HeaderMode;
    showMoreMenu: boolean;
    emptyContentText: I18nFieldValue;
    emptyContentIcon: string;

    constructor(taskViewService: TaskViewService,
                @Inject(NAE_NAVIGATION_ITEM_TASK_DATA) protected _navigationItemTaskData: Array<DataGroup>,
                activatedRoute: ActivatedRoute) {
        super(taskViewService);
        const taskSearchType = extractSearchTypeFromData(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_VIEW_SEARCH_TYPE);
        const headersChangeable = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_CHANGEABLE);
        const headersMode = extractFieldValueFromData<string[]>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_HEADERS_MODE);
        const allowTableMode = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_ALLOW_TABLE_MODE);
        const defaultHeadersMode = extractFieldValueFromData<string>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_DEFAULT_HEADERS_MODE);
        const showToggleButton = taskSearchType === SearchMode.ADVANCED
        const searchTypeConfig: SearchComponentConfiguration = {
            showSearchIcon: true,
            showSearchToggleButton: showToggleButton,
            initialSearchMode: (taskSearchType === undefined) ? undefined : SearchMode.FULLTEXT,
        }
        const showMoreMenu = extractFieldValueFromData<boolean>(this._navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_SHOW_MORE_MENU);

        if (!!activatedRoute.snapshot.paramMap.get('singleCaseId')) {
            this.searchEnabled = false;
        } else {
            this.searchEnabled = searchTypeConfig.initialSearchMode !== undefined;
        }

        this.initialSearchMode = searchTypeConfig.initialSearchMode;
        this.showToggleButton = showToggleButton;
        this.headersChangeable = headersChangeable;
        this.headersMode = headersMode ? headersMode : [];
        this.allowTableMode = allowTableMode;
        this.defaultHeadersMode = this.resolveHeaderMode(defaultHeadersMode);
        this.showMoreMenu = showMoreMenu;
        this.emptyContentText = extractFieldValueFromData<I18nFieldValue>(_navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_EMPTY_CONTENT_TEXT);
        this.emptyContentIcon = extractFieldValueFromData<string>(_navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_EMPTY_CONTENT_ICON);
    }

    private resolveHeaderMode(mode: string): HeaderMode {
        switch (mode) {
            case 'sort':
                return HeaderMode.SORT;
            case 'edit':
                return HeaderMode.EDIT;
            default:
                return undefined;
        }
    }

    isMenuOptionEnabled(option: string): boolean {
        return this.headersMode.some(e => e === option);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
