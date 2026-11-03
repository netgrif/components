import {
    Filter,
    FilterType,
    HeaderSortingMode,
    MergeOperator,
    MergedFilter,
    SimpleFilter,
    TabPersistenceMetadata
} from '@netgrif/components-core';

export const TABBED_VIEWS_TASK_TAB_TYPE = 'example.tabbed-views.task';
export const TABBED_VIEWS_FILTER_TAB_TYPE = 'example.tabbed-views.filter';

export interface TabbedViewsPersistedFilter {
    id: string;
    type: FilterType;
    title: string;
    body: unknown;
    operation?: MergeOperator;
}

export interface TabbedViewsTaskTabPayload {
    filter: TabbedViewsPersistedFilter;
    allowedNets: string[];
    headerSortingMode: HeaderSortingMode;
}

export interface TabbedViewsFilterTabPayload {
    filter: TabbedViewsPersistedFilter;
}

export function tabbedViewsTaskTabPersistence(caseId: string,
                                              filter: Filter,
                                              allowedNets: string[],
                                              headerSortingMode: HeaderSortingMode): TabPersistenceMetadata {
    return {
        id: `case:${caseId}`,
        type: TABBED_VIEWS_TASK_TAB_TYPE,
        payload: {
            filter: persistFilter(filter),
            allowedNets,
            headerSortingMode
        } as TabbedViewsTaskTabPayload
    };
}

export function tabbedViewsFilterTabPersistence(filterCaseId: string, filter: Filter): TabPersistenceMetadata {
    return {
        id: `filter:${filterCaseId}`,
        type: TABBED_VIEWS_FILTER_TAB_TYPE,
        payload: {filter: persistFilter(filter)} as TabbedViewsFilterTabPayload
    };
}

export function restoreTabbedViewsFilter(filter: TabbedViewsPersistedFilter): Filter {
    if (Array.isArray(filter.body)) {
        return new MergedFilter(
            filter.id,
            filter.type,
            filter.body,
            filter.operation ?? MergeOperator.AND,
            filter.title
        );
    }
    return new SimpleFilter(filter.id, filter.type, filter.body as object, filter.title);
}

function persistFilter(filter: Filter): TabbedViewsPersistedFilter {
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
