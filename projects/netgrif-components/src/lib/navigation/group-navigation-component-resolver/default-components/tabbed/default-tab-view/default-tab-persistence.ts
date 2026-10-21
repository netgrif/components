import {
    Filter,
    MergeOperator,
    MergedFilter,
    PersistedTabState,
    SimpleFilter,
    TabContent,
    TabPersistenceAdapter,
    TabRestoreContext
} from '@netgrif/components-core';
import {DefaultTabbedTaskViewComponent} from '../default-tabbed-task-view/default-tabbed-task-view.component';
import {DefaultTabbedSingleTaskViewComponent} from '../default-tabbed-single-task-view/default-tabbed-single-task-view.component';
import {DefaultTabbedCaseViewComponent} from '../default-tabbed-case-view/default-tabbed-case-view.component';
import {
    DEFAULT_FILTER_TAB_TYPE,
    DEFAULT_TASK_TAB_TYPE,
    DefaultFilterTabPayload,
    DefaultTaskTabPayload,
    PersistedFilter
} from './default-tab-persistence-metadata';

export class DefaultTabPersistenceAdapter implements TabPersistenceAdapter {

    public restore(state: PersistedTabState, context: TabRestoreContext): TabContent | undefined {
        if (state.persistence.type === DEFAULT_TASK_TAB_TYPE) {
            return this.restoreTaskTab(state, context);
        }
        if (state.persistence.type === DEFAULT_FILTER_TAB_TYPE) {
            return this.restoreFilterTab(state, context);
        }
        return undefined;
    }

    private restoreTaskTab(state: PersistedTabState, context: TabRestoreContext): TabContent | undefined {
        const payload = state.persistence.payload as DefaultTaskTabPayload;
        if (!payload?.filter || !payload.injectedObject) {
            return undefined;
        }
        const parent = [...context.initialTabs, ...context.restoredTabs]
            .find(tab => tab.persistence?.id === state.parentPersistenceId);
        const navigationItemTaskData = (parent?.injectedObject as any)?.navigationItemTaskData;
        return {
            label: state.label,
            canBeClosed: true,
            pinnable: true,
            tabContentComponent: payload.component === 'single-task'
                ? DefaultTabbedSingleTaskViewComponent
                : DefaultTabbedTaskViewComponent,
            injectedObject: {
                ...payload.injectedObject,
                ...(navigationItemTaskData ? {navigationItemTaskData} : {}),
                baseFilter: restoreFilter(payload.filter)
            }
        };
    }

    private restoreFilterTab(state: PersistedTabState, context: TabRestoreContext): TabContent | undefined {
        const payload = state.persistence.payload as DefaultFilterTabPayload;
        const parent = context.initialTabs.find(tab => tab.persistence?.id === state.parentPersistenceId);
        if (!payload?.filterCase || !parent?.injectedObject) {
            return undefined;
        }
        return {
            label: state.label,
            canBeClosed: true,
            pinnable: true,
            tabContentComponent: DefaultTabbedCaseViewComponent,
            injectedObject: {
                ...parent.injectedObject,
                filterCase: payload.filterCase
            }
        };
    }
}

function restoreFilter(filter: PersistedFilter): Filter {
    if (Array.isArray(filter.body)) {
        return new MergedFilter(filter.id, filter.type, filter.body, filter.operation ?? MergeOperator.AND, filter.title);
    }
    return new SimpleFilter(filter.id, filter.type, filter.body as object, filter.title);
}
