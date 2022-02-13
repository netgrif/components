import {InjectionToken} from '@angular/core';
import {FilterField} from './filter-field';

/**
 * Provides access to the {@link FilterField} instance for dependency injection inside
 * an {@link AbstractFilterFieldComponent} implementation.
 */
export const NAE_FILTER_FIELD = new InjectionToken<FilterField>('NaeFilterField');
