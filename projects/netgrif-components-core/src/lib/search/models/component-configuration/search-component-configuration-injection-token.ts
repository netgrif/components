import {InjectionToken} from '@angular/core';
import {SearchComponentConfiguration} from './search-component-configuration';

/**
 * Contains configuration of the [SearchComponent]{@link AbstractSearchComponent} that injects them.
 *
 * The component can be also configured by component inputs.
 */
export const NAE_SEARCH_COMPONENT_CONFIGURATION = new InjectionToken<SearchComponentConfiguration>('NaeSearchComponentConfiguration');
