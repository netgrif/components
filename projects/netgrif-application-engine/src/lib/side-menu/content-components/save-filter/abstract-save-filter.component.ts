import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {Inject} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {SaveFilterInjectionData} from './model/save-filter-injection-data';
import {LoggerService} from '../../../logger/services/logger.service';
import {AbstractTaskView} from '../../../view/task-view/abstract-task-view';
import {TaskViewService} from '../../../view/task-view/service/task-view.service';

export abstract class AbstractSaveFilterComponent extends AbstractTaskView {

    protected _injectedData: SaveFilterInjectionData;

    protected constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                          protected _snackBar: SnackBarService,
                          protected _log: LoggerService,
                          taskViewService: TaskViewService) {
        super(taskViewService);
        if (this._sideMenuControl.data) {
            this._injectedData = this._sideMenuControl.data as SaveFilterInjectionData;
        }
    }

    protected showErrorSnackBar() {
        // TODO i18n
        this._snackBar.openErrorSnackBar('Filter could not be saved');
    }
}
