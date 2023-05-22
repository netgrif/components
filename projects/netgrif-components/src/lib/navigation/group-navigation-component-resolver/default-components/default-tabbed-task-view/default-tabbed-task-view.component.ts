import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
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
    tabbedTaskViewConfigurationFactory,
    tabbedAllowedNetsServiceFactory, SearchMode
} from '@netgrif/components-core';
import {HeaderComponent} from '../../../../header/header.component';
import {
    InjectedTabbedTaskViewDataWithNavigationItemTaskData
} from "../model/injected-tabbed-task-view-data-with-navigation-item-task-data";

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
        }
    ]
})
export class DefaultTabbedTaskViewComponent extends AbstractTabbedTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    initialSearchMode: SearchMode;
    showToggleButton: boolean;
    enableSearch: boolean;

    constructor(taskViewService: TaskViewService, @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedTaskViewDataWithNavigationItemTaskData) {
        super(taskViewService, injectedTabData);

        this.initialSearchMode = injectedTabData.taskViewSearchTypeConfiguration.initialSearchMode;
        this.showToggleButton = injectedTabData.taskViewSearchTypeConfiguration.showSearchToggleButton;
        this.enableSearch = !(injectedTabData.taskViewSearchTypeConfiguration.initialSearchMode === undefined);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
