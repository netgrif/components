import {
    PersistedTabState,
    TabContent,
    TabPersistenceAdapter,
    TabRestoreContext
} from '@netgrif/components-core';
import {TabbedCaseViewComponent} from './tabbed-case-view/tabbed-case-view.component';
import {TabbedTaskViewComponent} from './tabbed-task-view/tabbed-task-view.component';
import {
    restoreTabbedViewsFilter,
    TABBED_VIEWS_FILTER_TAB_TYPE,
    TABBED_VIEWS_TASK_TAB_TYPE,
    TabbedViewsFilterTabPayload,
    TabbedViewsTaskTabPayload
} from './tabbed-views-persistence-metadata';

export class TabbedViewsPersistenceAdapter implements TabPersistenceAdapter {

    public restore(state: PersistedTabState, context: TabRestoreContext): TabContent | undefined {
        if (state.persistence.type === TABBED_VIEWS_TASK_TAB_TYPE) {
            return this.restoreTaskTab(state);
        }
        if (state.persistence.type === TABBED_VIEWS_FILTER_TAB_TYPE) {
            return this.restoreFilterTab(state, context);
        }
        return undefined;
    }

    private restoreTaskTab(state: PersistedTabState): TabContent | undefined {
        const payload = state.persistence.payload as TabbedViewsTaskTabPayload;
        if (!payload?.filter) {
            return undefined;
        }
        return {
            label: state.label,
            canBeClosed: true,
            pinnable: true,
            tabContentComponent: TabbedTaskViewComponent,
            injectedObject: {
                baseFilter: restoreTabbedViewsFilter(payload.filter),
                allowedNets: payload.allowedNets,
                headerSortingMode: payload.headerSortingMode
            }
        };
    }

    private restoreFilterTab(state: PersistedTabState, context: TabRestoreContext): TabContent | undefined {
        const payload = state.persistence.payload as TabbedViewsFilterTabPayload;
        const parent = [...context.initialTabs, ...context.restoredTabs]
            .find(tab => tab.persistence?.id === state.parentPersistenceId);
        if (!payload?.filter || !parent?.injectedObject) {
            return undefined;
        }
        return {
            label: state.label,
            canBeClosed: true,
            pinnable: true,
            tabContentComponent: TabbedCaseViewComponent,
            injectedObject: {
                ...parent.injectedObject,
                loadFilter: restoreTabbedViewsFilter(payload.filter)
            }
        };
    }
}
