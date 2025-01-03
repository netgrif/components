import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    NAE_TAB_DATA,
    TaskViewService,
    AbstractTabbedTaskViewComponent,
    InjectedTabbedTaskViewData,
    CategoryFactory,
    SearchService,
    NAE_BASE_FILTER,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    ViewIdService,
    NAE_TASK_VIEW_CONFIGURATION,
    ChangedFieldsService,
    tabbedTaskViewConfigurationFactory,
    tabbedAllowedNetsServiceFactory
} from '@netgrif/components-core';
import {HeaderComponent} from "../../header/header.component";

function baseFilterFactory(injectedTabData: InjectedTabbedTaskViewData) {
    return {
        filter: injectedTabData.baseFilter
    };
}

@Component({
    selector: 'nc-filter-field-tabbed-task-view',
    templateUrl: './filter-field-tabbed-task-view.component.html',
    styleUrls: ['./filter-field-tabbed-task-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ChangedFieldsService,
        {   provide: ViewIdService, useValue: null},
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
export class FilterFieldTabbedTaskViewComponent extends AbstractTabbedTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService, @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedTaskViewData) {
        super(taskViewService, injectedTabData);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

}
