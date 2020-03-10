import {PreferenceFilters} from './preference-filters';
import {PreferenceHeaders} from './preference-headers';

export interface Preferences {
    taskFilters: PreferenceFilters;
    taskHeaders: PreferenceHeaders;

    caseFilters: PreferenceFilters;
    caseHeaders: PreferenceHeaders;

    workflowFilters: PreferenceFilters;
    workflowHeaders: PreferenceHeaders;
}
