import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {
    AllowedNetsService,
    AllowedNetsServiceFactory,
    BaseFilter,
    LoggerService,
    NAE_BASE_FILTER,
    SearchService,
    SimpleFilter,
    TaskEventNotification,
    TaskViewService,
    TaskViewInjectionData,
    AbstractSingleTaskViewComponent,
    TaskEvent
} from '@netgrif/components-core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {HeaderComponent} from "../../header/header.component";
import {
    localAllowedNetsFactory
} from "../../filter-field-content/filter-field-tabbed-case-view/filter-field-tabbed-case-view.component";

export function singleTaskViewFilterFactory(dialogControl: TaskViewInjectionData): BaseFilter {
    if (!dialogControl) {
        throw new Error('NewFilterCaseId was not provided in the side menu injection data');
    }
    const injectedData = dialogControl as TaskViewInjectionData;

    return {
        filter: SimpleFilter.fromTaskQuery(injectedData.searchBody)
    };
}

@Component({
    selector: 'nc-single-task-view-dialog',
    templateUrl: './single-task-view-dialog.component.html',
    styleUrls: ['./single-task-view-dialog.component.scss'],
    providers: [
        TaskViewService,
        SearchService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: singleTaskViewFilterFactory,
            deps: [MAT_DIALOG_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        }
    ]
})
export class SingleTaskViewDialogComponent extends AbstractSingleTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;
    protected _injectedData: TaskViewInjectionData;

    constructor(protected _dialogRef: MatDialogRef<SingleTaskViewDialogComponent>,
                @Inject(MAT_DIALOG_DATA) protected _data: TaskViewInjectionData,
                protected _log: LoggerService,
                taskViewService: TaskViewService,
                _activatedRoute?: ActivatedRoute) {
        super(taskViewService, _activatedRoute);
        if (this._data) {
            this._injectedData = this._data as TaskViewInjectionData;
        }
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

    public processTaskEvents(notification: TaskEventNotification): void {
        if (!notification.success) {
            return;
        }

        if (notification.event === TaskEvent.FINISH) {
            this._dialogRef.close({opened: false, message: 'Task finished'});
        }

        if (notification.event === TaskEvent.CANCEL) {
            this._dialogRef.close({opened: false, message: 'Task canceled'});
        }
    }
}
