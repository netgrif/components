import {Component, Inject} from '@angular/core';
import {
    AbstractTaskViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory, BaseFilter,
    LoggerService,
    NAE_BASE_FILTER,
    SaveFilterInjectionData,
    SearchService, SimpleFilter,
    TaskEvent,
    TaskEventNotification,
    TaskViewService, UserFilterConstants,
    UserFiltersService,
} from '@netgrif/components-core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {localAllowedNetsFactory} from '../../side-menu/content-components/save-filter/save-filter.component';

export function saveBaseFilterFactory(dialogControl: SaveFilterInjectionData): BaseFilter {
    if (!dialogControl) {
        throw new Error('NewFilterCaseId was not provided in the sidemenu injectio data');
    }
    const injectedData = dialogControl as SaveFilterInjectionData;

    return {
        filter: SimpleFilter.fromTaskQuery({
            case: {id: injectedData.newFilterCaseId},
            transitionId: UserFilterConstants.NEW_FILTER_TRANSITION_ID
        })
    };
}


@Component({
    selector: 'nc-save-filter-dialog',
    templateUrl: './save-filter-dialog.component.html',
    styleUrls: ['./save-filter-dialog.component.scss'],
    providers: [
        TaskViewService,
        SearchService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: saveBaseFilterFactory,
            deps: [MAT_DIALOG_DATA]
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        },
    ]
})
export class SaveFilterDialogComponent extends AbstractTaskViewComponent {

    protected _injectedData: SaveFilterInjectionData;

    constructor(protected _dialogRef: MatDialogRef<SaveFilterDialogComponent>,
                @Inject(MAT_DIALOG_DATA) protected _data: SaveFilterInjectionData,
                protected _userFilterService: UserFiltersService,
                protected _log: LoggerService,
                taskViewService: TaskViewService,
                _activatedRoute?: ActivatedRoute) {
        super(taskViewService, _activatedRoute);
        if (this._data) {
            this._injectedData = this._data as SaveFilterInjectionData;
        }
    }

    public processTaskEvents(notification: TaskEventNotification): void {
        if (!notification.success) {
            return;
        }

        if (notification.event === TaskEvent.FINISH) {
            this._dialogRef.close({opened: false, message: 'Filter saved'});
        }

        if (notification.event === TaskEvent.CANCEL) {
            this._userFilterService.delete(this._injectedData.newFilterCaseId);
            this._dialogRef.close({opened: false, message: 'Filter save canceled'});
        }
    }
}
