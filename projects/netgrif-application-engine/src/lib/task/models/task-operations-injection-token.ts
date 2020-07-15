import {InjectionToken} from '@angular/core';
import {TaskOperations} from '../interfaces/task-operations';

export const NAE_TASK_OPERATIONS = new InjectionToken<TaskOperations>('NaeTaskOperationsInterface');
