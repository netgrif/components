import {PreferenceFilters} from './preference-filters';
import {PreferenceHeaders} from './preference-headers';

export interface Preferences {
    taskFilters: PreferenceFilters;
    taskHeaders: {
        [viewId: string]: PreferenceHeaders
    };

    caseFilters: PreferenceFilters;
    caseHeaders: {
        [viewId: string]: PreferenceHeaders
    };

    workflowFilters: PreferenceFilters;
    workflowHeaders: {
        [viewId: string]: PreferenceHeaders
    };
}
