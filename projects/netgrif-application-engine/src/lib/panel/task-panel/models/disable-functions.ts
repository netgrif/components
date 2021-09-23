import {Task} from '../../../resources/interface/task';
import {InjectionToken} from '@angular/core';

export const NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS = new InjectionToken<DisableButtonFunctions>('NaeTaskPanelDisableFunctions');

export type DisableButtonFunctions = {
    [k in TaskButton]: (t: Task) => boolean;
};

export enum TaskButton {
    FINISH = 'finish',
    ASSIGN = 'assign',
    DELEGATE = 'delegate',
    REASSIGN = 'reassign',
    CANCEL = 'cancel'
}
