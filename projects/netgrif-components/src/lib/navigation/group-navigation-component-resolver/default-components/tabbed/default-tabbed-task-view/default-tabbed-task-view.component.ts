import {AfterViewInit, Component, Inject, Optional, ViewChild} from '@angular/core';
import {
    NAE_TAB_DATA,
    TaskViewService,
    AbstractTabbedTaskViewComponent,
    CategoryFactory,
    SearchService,
    NAE_BASE_FILTER,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    ViewIdService,
    NAE_TASK_VIEW_CONFIGURATION,
    ChangedFieldsService,
    navigationItemTaskViewDefaultHeadersFactory,
    tabbedTaskViewConfigurationFactory,
    tabbedAllowedNetsServiceFactory,
    SearchMode,
    HeaderMode,
    NAE_DEFAULT_HEADERS,
    NAE_NAVIGATION_ITEM_TASK_DATA,
    NAE_DEFAULT_TASK_SEARCH_CATEGORIES,
    NAE_SEARCH_CATEGORIES,
    OverflowService,
    extractFieldValueFromData,
    I18nFieldValue,
    GroupNavigationConstants, NAE_DYNAMIC_DEFAULT_SORT, ProcessService
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../../../header/header.component';
import {
    InjectedTabbedTaskViewDataWithNavigationItemTaskData
} from "../../model/injected-tabbed-task-view-data-with-navigation-item-task-data";
import {buildDynamicSortChangeDescriptionForTask$} from "../../model/factory-methods";

export function baseFilterFactory(injectedTabData: InjectedTabbedTaskViewDataWithNavigationItemTaskData) {
    return {
        filter: injectedTabData.baseFilter
    };
}

@Component({
    selector: 'nc-default-tabbed-task-view',
    templateUrl: './default-tabbed-task-view.component.html',
    styleUrls: ['./default-tabbed-task-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ViewIdService,
        ChangedFieldsService,
        OverflowService,
        {
            provide: NAE_DYNAMIC_DEFAULT_SORT,
            useFactory: buildDynamicSortChangeDescriptionForTask$,
            deps: [NAE_NAVIGATION_ITEM_TASK_DATA, ProcessService]
        },
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [NAE_TAB_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: tabbedAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, NAE_TAB_DATA, NAE_NAVIGATION_ITEM_TASK_DATA]
        },
        {
            provide: NAE_TASK_VIEW_CONFIGURATION,
            useFactory: tabbedTaskViewConfigurationFactory,
            deps: [NAE_TAB_DATA]
        },
        {
            provide: NAE_SEARCH_CATEGORIES, useExisting: NAE_DEFAULT_TASK_SEARCH_CATEGORIES
        },
        {
            provide: NAE_DEFAULT_HEADERS,
            useFactory: navigationItemTaskViewDefaultHeadersFactory,
            deps: [[new Optional(), NAE_NAVIGATION_ITEM_TASK_DATA]]
        }
    ]
})
export class DefaultTabbedTaskViewComponent extends AbstractTabbedTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    initialSearchMode: SearchMode;
    showToggleButton: boolean;
    enableSearch: boolean;
    headersChangeable: boolean;
    headersMode: string[];
    allowTableMode: boolean;
    defaultHeadersMode: HeaderMode;
    showMoreMenu: boolean;
    emptyContentText: I18nFieldValue;
    emptyContentIcon: string;

    constructor(taskViewService: TaskViewService, @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedTaskViewDataWithNavigationItemTaskData) {
        super(taskViewService, injectedTabData);

        this.initialSearchMode = injectedTabData.searchTypeConfiguration.initialSearchMode;
        this.showToggleButton = injectedTabData.searchTypeConfiguration.showSearchToggleButton;
        this.enableSearch = injectedTabData.searchTypeConfiguration.initialSearchMode !== undefined;
        this.headersChangeable = injectedTabData.headersChangeable;
        this.headersMode = injectedTabData.headersMode ? injectedTabData.headersMode : [];
        this.allowTableMode = injectedTabData.allowTableMode;
        this.defaultHeadersMode = this.resolveHeaderMode(injectedTabData.defaultHeadersMode);
        this.showMoreMenu = injectedTabData.showMoreMenu;
        if (!!injectedTabData.navigationItemTaskData) {
            this.emptyContentText = extractFieldValueFromData<I18nFieldValue>(injectedTabData.navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_EMPTY_CONTENT_TEXT);
            this.emptyContentIcon = extractFieldValueFromData<string>(injectedTabData.navigationItemTaskData, GroupNavigationConstants.ITEM_FIELD_ID_TASK_EMPTY_CONTENT_ICON);
        }
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
        this.taskHeaderComponent.changeHeadersMode(this.defaultHeadersMode, false);
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
            default:
                return undefined;
        }
    }
}
