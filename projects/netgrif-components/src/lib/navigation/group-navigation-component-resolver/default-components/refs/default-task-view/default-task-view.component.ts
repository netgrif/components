import {AfterViewInit, Component, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {
    AbstractTaskViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    CategoryFactory,
    ChangedFieldsService,
    NAE_ASYNC_RENDERING_CONFIGURATION,
    NAE_TASK_FORCE_OPEN,
    SearchService,
    TaskEventNotification,
    TaskViewService, ViewIdService
} from "@netgrif/components-core";
import {HeaderComponent} from "../../../../../header/header.component";

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createWithAllNets();
};

@Component({
    selector: 'nc-default-task-view',
    templateUrl: './default-task-view.component.html',
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ChangedFieldsService,
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        },
        {provide: NAE_TASK_FORCE_OPEN, useValue: false},
        ViewIdService,
        {
            provide: NAE_ASYNC_RENDERING_CONFIGURATION,
            useValue: {enableAsyncRenderingForNewFields: false, enableAsyncRenderingOnTaskExpand: false}
        }
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DefaultTaskViewComponent extends AbstractTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService) {
        super(taskViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

    logEvent(event: TaskEventNotification) {
        console.log(event);
    }

}
