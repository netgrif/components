import {PreferenceFilters} from './preference-filters';
import {PreferenceHeaders} from './preference-headers';

/**
 * Header preferences are strings in format: <petrinet identifier>-<datafield id>
 */
export interface Preferences {
    taskFilters: {
        [viewId: string]: PreferenceFilters
    };
    taskHeaders: {
        [viewId: string]: PreferenceHeaders
    };

    caseFilters: {
        [viewId: string]: PreferenceFilters
    };
    caseHeaders: {
        [viewId: string]: PreferenceHeaders
    };

    workflowFilters: {
        [viewId: string]: PreferenceFilters
    };
    workflowHeaders: {
        [viewId: string]: PreferenceHeaders
    };
}
