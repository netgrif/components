import {InjectionToken} from '@angular/core';
import {HeaderSortingMode} from './header-sorting-mode';

/**
 * Configures whether headers allow one or multiple simultaneously active sort columns.
 * {@link HeaderSortingMode.COMBINED} allows multiple sorts in edit mode and a single sort in normal sort mode.
 * Defaults to {@link HeaderSortingMode.SINGLE} when no value is provided.
 */
export const NAE_HEADER_SORTING_MODE = new InjectionToken<HeaderSortingMode>('NaeHeaderSortingMode');
