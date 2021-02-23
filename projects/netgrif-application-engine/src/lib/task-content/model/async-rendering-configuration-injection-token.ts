import {InjectionToken} from '@angular/core';

/**
 * Holds configuration of the task content async rendering properties.
 *
 * The value represents the number of elements rendered in one rendering cycle
 */
export const NAE_ASYNC_RENDERING_CONFIGURATION = new InjectionToken<number>('NaeAsyncRenderingConfiguration');
