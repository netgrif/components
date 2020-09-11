import {InjectionToken} from '@angular/core';
import {TaskEndpoint} from './task-endpoint';

export const NAE_PREFERRED_TASK_ENDPOINT = new InjectionToken<TaskEndpoint>('NaePreferredTaskEndpoint');
