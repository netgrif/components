import {Component, Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {SaveFilterInjectionData} from './model/save-filter-injection-data';
import {AbstractTaskViewComponent} from '../../../view/task-view/abstract-task-view';
import {TaskViewService} from '../../../view/task-view/service/task-view.service';
import {TaskEventNotification} from '../../../task-content/model/task-event-notification';
import {TaskEvent} from '../../../task-content/model/task-event';
import {LoggerService} from '../../../logger/services/logger.service';
import {UserFiltersService} from '../../../filter/user-filters.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ncc-abstract-save-filter',
    template: ''
})
export abstract class AbstractSaveFilterComponent extends AbstractTaskViewComponent {

    protected _injectedData: SaveFilterInjectionData;

    protected constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                          protected _userFilterService: UserFiltersService,
                          protected _log: LoggerService,
                          taskViewService: TaskViewService,
                          _activatedRoute?: ActivatedRoute) {
        super(taskViewService, _activatedRoute);
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
            this._userFilterService.delete(this._injectedData.newFilterCaseId);
            this._sideMenuControl.close({opened: false, message: 'Filter save canceled'});
        }
    }
}
