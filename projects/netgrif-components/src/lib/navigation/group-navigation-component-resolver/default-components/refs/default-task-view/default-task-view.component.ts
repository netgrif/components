import {AfterViewInit, Component, Inject, Optional, ViewChild} from '@angular/core';
import {
    AbstractTaskViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    CategoryFactory,
    ChangedFieldsService,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    NAE_ASYNC_RENDERING_CONFIGURATION, NAE_CLICKABLE_TASKS, NAE_DATAFIELD_ALLOWED_NETS,
    NAE_DEFAULT_HEADERS,
    NAE_TASK_FORCE_OPEN,
    SearchService,
    TaskEventNotification,
    TaskRefField,
    TaskViewService, ViewIdService
} from "@netgrif/components-core";
import {HeaderComponent} from "../../../../../header/header.component";

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory, allowedNets: Array<string>) => {
    if (allowedNets?.length > 0) {
        return factory.createFromArray(allowedNets);
    } else {
        return factory.createWithAllNets();
    }
};

@Component({
    selector: 'nc-default-task-view',
    templateUrl: './default-task-view.component.html',
    styleUrls: ['./default-task-view.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        ChangedFieldsService,
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory, NAE_DATAFIELD_ALLOWED_NETS]
        },
        {provide: NAE_TASK_FORCE_OPEN, useValue: false},
        ViewIdService,
        {
            provide: NAE_ASYNC_RENDERING_CONFIGURATION,
            useValue: {enableAsyncRenderingForNewFields: false, enableAsyncRenderingOnTaskExpand: false}
        }
    ]
})
export class DefaultTaskViewComponent extends AbstractTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;
    public taskHeadersCount;

    constructor(taskViewService: TaskViewService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) protected _dataFieldPortalData: DataFieldPortalData<TaskRefField>,
                @Optional() @Inject(NAE_CLICKABLE_TASKS) protected _clickableTasks: boolean = true,
                @Optional() @Inject(NAE_DEFAULT_HEADERS) protected _taskHeaders: string[]) {
        super(taskViewService);
        this.taskHeadersCount = this._taskHeaders?.length;
    }

    public disabled(): boolean {
        return this._dataFieldPortalData?.dataField?.formControlRef.disabled;
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

    logEvent(event: TaskEventNotification) {
        console.log(event);
    }

}
