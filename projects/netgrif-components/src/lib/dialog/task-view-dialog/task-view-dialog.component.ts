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
    UserFiltersService,
    AbstractSingleTaskViewComponent,
    TaskEvent
} from '@netgrif/components-core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {localAllowedNetsFactory} from "../../side-menu/content-components/save-filter/save-filter.component";
import {ActivatedRoute} from "@angular/router";
import {HeaderComponent} from "../../header/header.component";

export function taskViewFilterFactory(dialogControl: TaskViewInjectionData): BaseFilter {
    if (!dialogControl) {
        throw new Error('NewFilterCaseId was not provided in the sidemenu injectio data');
    }
    const injectedData = dialogControl as TaskViewInjectionData;

    return {
        filter: SimpleFilter.fromTaskQuery({
            stringId: injectedData.taskIds
        })
    };
}

@Component({
    selector: 'nc-task-view-dialog',
    templateUrl: './task-view-dialog.component.html',
    styleUrls: ['./task-view-dialog.component.scss'],
    providers: [
        TaskViewService,
        SearchService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: taskViewFilterFactory,
            deps: [MAT_DIALOG_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        }
    ],
    standalone: false
})
export class TaskViewDialogComponent extends AbstractSingleTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;
    protected _injectedData: TaskViewInjectionData;

    constructor(protected _dialogRef: MatDialogRef<TaskViewDialogComponent>,
                @Inject(MAT_DIALOG_DATA) protected _data: TaskViewInjectionData,
                protected _userFilterService: UserFiltersService,
                protected _log: LoggerService,
                taskViewService: TaskViewService,
                @Inject(NAE_BASE_FILTER) baseFilter: BaseFilter,
                _activatedRoute?: ActivatedRoute) {
        super(taskViewService, _activatedRoute, baseFilter);
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
