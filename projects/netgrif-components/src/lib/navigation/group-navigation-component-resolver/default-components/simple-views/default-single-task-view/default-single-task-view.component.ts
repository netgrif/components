import {Component} from '@angular/core';
import {
    AbstractSingleTaskViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory, BaseAllowedNetsService,
    ChangedFieldsService, FilterExtractionService,
    FilterType,
    FinishTaskService,
    FrontActionService,
    NAE_BASE_FILTER, NAE_NAVIGATION_ITEM_TASK_DATA,
    NAE_TASK_OPERATIONS,
    NAE_VIEW_ID_SEGMENT, navigationItemTaskAllowedNetsServiceFactory, navigationItemTaskFilterFactory,
    RedirectService,
    SearchService,
    SimpleFilter,
    SubjectTaskOperations,
    TaskDataService,
    TaskEventService,
    TaskRequestStateService,
    TaskViewService,
    ViewIdService
} from "@netgrif/components-core";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'nc-default-single-task-view',
    templateUrl: './default-single-task-view.component.html',
    styleUrls: ['./default-single-task-view.component.scss'],
    providers: [
        TaskViewService,
        SearchService,
        RedirectService,
        ChangedFieldsService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: navigationItemTaskFilterFactory,
            deps: [FilterExtractionService, NAE_NAVIGATION_ITEM_TASK_DATA]
        },
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'publicTaskView'},
        {provide: AllowedNetsServiceFactory, useClass: AllowedNetsServiceFactory},
        {
            provide: AllowedNetsService,
            useFactory: navigationItemTaskAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, BaseAllowedNetsService, NAE_NAVIGATION_ITEM_TASK_DATA]
        },
        ViewIdService,
        TaskDataService,
        FrontActionService,
        FinishTaskService,
        TaskRequestStateService,
        TaskEventService,
        {provide: NAE_TASK_OPERATIONS, useClass: SubjectTaskOperations},
        AsyncPipe
    ]
})
export class DefaultSingleTaskViewComponent extends AbstractSingleTaskViewComponent {

    hidePanelHeader = true;
    hideActionRow = false;
    showPageHeader: boolean = true;
    showPageFooter: boolean = false;
    actionRowJustifyContent: "center" = "center";
    showFinishButton: boolean = true;

    constructor(taskViewService: TaskViewService,
                activatedRoute: ActivatedRoute) {
        super(taskViewService, activatedRoute);
    }

    public getFinishTitle(): string {
        return (this.finishTitle === '' || this.finishTitle) ? this.finishTitle : 'tasks.view.finish';
    }
}
