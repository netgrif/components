import {
    Filter,
    FilterType,
    MergeOperator,
    TabPersistenceMetadata
} from '@netgrif/components-core';

export const DEFAULT_TASK_TAB_TYPE = 'netgrif.default-task-tab';
export const DEFAULT_FILTER_TAB_TYPE = 'netgrif.default-filter-tab';

export interface PersistedFilter {
    id: string;
    type: FilterType;
    title: string;
    body: unknown;
    operation?: MergeOperator;
}

export interface DefaultTaskTabPayload {
    component: 'task' | 'single-task';
    filter: PersistedFilter;
    injectedObject: object;
}

export interface DefaultFilterTabPayload {
    filterCase: object;
}

export function defaultTaskTabPersistence(caseId: string,
                                          component: 'task' | 'single-task',
                                          filter: Filter,
                                          injectedObject: object): TabPersistenceMetadata {
    const persistedInjectedObject = {...injectedObject} as any;
    delete persistedInjectedObject.navigationItemTaskData;
    return {
        id: `case:${caseId}`,
        type: DEFAULT_TASK_TAB_TYPE,
        payload: {
            component,
            filter: persistFilter(filter),
            injectedObject: persistedInjectedObject
        } as DefaultTaskTabPayload
    };
}

export function defaultFilterTabPersistence(filterCaseId: string, filterCase: object): TabPersistenceMetadata {
    return {
        id: `filter:${filterCaseId}`,
        type: DEFAULT_FILTER_TAB_TYPE,
        payload: {filterCase} as DefaultFilterTabPayload
    };
}

function persistFilter(filter: Filter): PersistedFilter {
    const body = filter.getRequestBody();
    const params = filter.getRequestParams() as {operation?: MergeOperator};
    return {
        id: filter.id,
        type: filter.type,
        title: filter.title,
        body,
        operation: Array.isArray(body) ? params.operation : undefined
    };
}
