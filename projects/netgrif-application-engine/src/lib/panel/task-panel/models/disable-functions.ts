import {Task} from '../../../resources/interface/task';
import {InjectionToken} from '@angular/core';

export const NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS = new InjectionToken<DisableButtonFuntions>('NaeTaskPanelDisableFunctions');

export interface DisableButtonFuntions {
    finish?: (t: Task) => boolean;
    assign?: (t: Task) => boolean;
    delegate?: (t: Task) => boolean;
    reassign?: (t: Task) => boolean;
    cancel?: (t: Task) => boolean;
}
