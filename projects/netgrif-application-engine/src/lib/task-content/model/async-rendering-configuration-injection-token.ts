import {InjectionToken} from '@angular/core';
import {AsyncRenderingConfiguration} from './async-rendering-configuration';

/**
 * Holds configuration of the task content async rendering properties.
 *
 * The value represents the number of elements rendered in one rendering cycle
 */
export const NAE_ASYNC_RENDERING_CONFIGURATION = new InjectionToken<AsyncRenderingConfiguration>('NaeAsyncRenderingConfiguration');
