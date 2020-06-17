import {InjectionToken} from '@angular/core';
import {TaskListOperations} from '../interfaces/task-list-operations';

export const NAE_TASK_LIST_OPERATIONS = new InjectionToken<TaskListOperations>('NaeTaskListOperations');
