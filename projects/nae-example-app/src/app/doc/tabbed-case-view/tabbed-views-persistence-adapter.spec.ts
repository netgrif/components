import {
    FilterType,
    HeaderSortingMode,
    PersistedTabState,
    SimpleFilter,
    TabContent
} from '@netgrif/components-core';
import {TabbedViewsPersistenceAdapter} from './tabbed-views-persistence-adapter';
import {
    tabbedViewsFilterTabPersistence,
    tabbedViewsTaskTabPersistence
} from './tabbed-views-persistence-metadata';
import {TabbedCaseViewComponent} from './tabbed-case-view/tabbed-case-view.component';
import {TabbedTaskViewComponent} from './tabbed-task-view/tabbed-task-view.component';

describe('TabbedViewsPersistenceAdapter', () => {
    const adapter = new TabbedViewsPersistenceAdapter();

    it('should restore a task tab', () => {
        const filter = new SimpleFilter('', FilterType.TASK, {case: {id: 'case-1'}});
        const state = persistedState(
            tabbedViewsTaskTabPersistence('case-1', filter, ['net-1'], HeaderSortingMode.SINGLE),
            'root'
        );

        const restored = adapter.restore(state, {initialTabs: [], restoredTabs: []});

        expect(restored.tabContentComponent).toBe(TabbedTaskViewComponent);
        expect(restored.pinnable).toBeTrue();
        expect((restored.injectedObject as any).allowedNets).toEqual(['net-1']);
        expect((restored.injectedObject as any).baseFilter.getRequestBody()).toEqual({case: {id: 'case-1'}});
    });

    it('should restore a filter tab from its persisted parent', () => {
        const filter = new SimpleFilter('filter-1', FilterType.CASE, {query: 'title:test'}, 'Test filter');
        const parent: TabContent = {
            label: {text: 'Root'},
            canBeClosed: false,
            tabContentComponent: TabbedCaseViewComponent,
            persistence: {id: 'root', type: 'initial'},
            injectedObject: {exampleUseCache: true}
        };
        const state = persistedState(tabbedViewsFilterTabPersistence('filter-1', filter), 'root');

        const restored = adapter.restore(state, {initialTabs: [parent], restoredTabs: []});

        expect(restored.tabContentComponent).toBe(TabbedCaseViewComponent);
        expect((restored.injectedObject as any).exampleUseCache).toBeTrue();
        expect((restored.injectedObject as any).loadFilter.getRequestBody()).toEqual({query: 'title:test'});
    });
});

function persistedState(persistence: PersistedTabState['persistence'], parentPersistenceId: string): PersistedTabState {
    return {
        persistence,
        label: {text: 'Persisted tab'},
        order: 0,
        pinned: true,
        parentPersistenceId,
        initial: false
    };
}
