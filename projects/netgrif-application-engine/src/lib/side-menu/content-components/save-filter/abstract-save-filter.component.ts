import {Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {SaveFilterInjectionData} from './model/save-filter-injection-data';
import {AbstractTaskView} from '../../../view/task-view/abstract-task-view';
import {TaskViewService} from '../../../view/task-view/service/task-view.service';
import {TaskEventNotification} from '../../../task-content/model/task-event-notification';
import {TaskEvent} from '../../../task-content/model/task-event';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';

export abstract class AbstractSaveFilterComponent extends AbstractTaskView {

    protected _injectedData: SaveFilterInjectionData;

    protected constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                          protected _caseResourceService: CaseResourceService,
                          protected _log: LoggerService,
                          taskViewService: TaskViewService) {
        super(taskViewService);
        if (this._sideMenuControl.data) {
            this._injectedData = this._sideMenuControl.data as SaveFilterInjectionData;
        }
    }

    public processTaskEvents(notification: TaskEventNotification): void {
        if (!notification.success) {
            return;
        }

        if (notification.event === TaskEvent.FINISH) {
            this._sideMenuControl.close({opened: false, message: 'Filter saved'});
        }

        if (notification.event === TaskEvent.CANCEL) {
            this._caseResourceService.deleteCase(this._injectedData.newFilterCaseId).subscribe(response => {
                if (response.success) {
                    this._log.debug('Save filter case delete success', response);
                } else {
                    this._log.error('Save filter case delete failure', response);
                }
            }, e => {
                this._log.error('Save filter case delete error', e);
            });
            this._sideMenuControl.close({opened: false, message: 'Filter save canceled'});
        }
    }
}
