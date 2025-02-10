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
    OverflowService,
} from 'netgrif-components-core';
import {HeaderComponent} from '../../../../../header/header.component';
import {
    InjectedTabbedTaskViewDataWithNavigationItemTaskData
} from "../../model/injected-tabbed-task-view-data-with-navigation-item-task-data";

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
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [NAE_TAB_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: tabbedAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, NAE_TAB_DATA]
        },
        {
            provide: NAE_TASK_VIEW_CONFIGURATION,
            useFactory: tabbedTaskViewConfigurationFactory,
            deps: [NAE_TAB_DATA]
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
