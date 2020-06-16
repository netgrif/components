import {InjectionToken} from '@angular/core';
import {TaskFinishEvent} from '../interfaces/task-finish-event';

export const NAE_TASK_FINISH_EVENT = new InjectionToken<TaskFinishEvent>('NaeTaskFinishEvent');
