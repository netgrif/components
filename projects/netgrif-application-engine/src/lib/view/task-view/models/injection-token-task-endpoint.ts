import {InjectionToken} from '@angular/core';
import {TaskEndpoint} from './task-endpoint';

/**
 * @deprecated in 5.3.0 - Use {@link NAE_TASK_VIEW_CONFIGURATION} instead
 */
export const NAE_PREFERRED_TASK_ENDPOINT = new InjectionToken<TaskEndpoint>('NaePreferredTaskEndpoint');
