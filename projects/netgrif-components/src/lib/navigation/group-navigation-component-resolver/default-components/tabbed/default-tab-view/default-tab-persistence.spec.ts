import {FilterType, MergeOperator, PersistedTabState} from '@netgrif/components-core';
import {DefaultTabPersistenceAdapter} from './default-tab-persistence';
import {DEFAULT_FILTER_TAB_TYPE, DEFAULT_TASK_TAB_TYPE} from './default-tab-persistence-metadata';
import {DefaultTabbedTaskViewComponent} from '../default-tabbed-task-view/default-tabbed-task-view.component';
import {DefaultTabbedCaseViewComponent} from '../default-tabbed-case-view/default-tabbed-case-view.component';

describe('DefaultTabPersistenceAdapter', () => {
    const adapter = new DefaultTabPersistenceAdapter();

    it('should restore a task tab and its filter', () => {
        const state: PersistedTabState = {
            persistence: {
                id: 'case:1',
                type: DEFAULT_TASK_TAB_TYPE,
                payload: {
                    component: 'task',
                    filter: {
                        id: 'filter',
                        type: FilterType.TASK,
                        title: 'Filter',
                        body: [{case: {id: '1'}}, {query: 'state:open'}],
                        operation: MergeOperator.AND
                    },
                    injectedObject: {allowedNets: ['process']}
                }
            },
            label: {text: 'Case'},
            order: 0,
            pinned: true,
            initial: false
        };

        const restored = adapter.restore(state, {initialTabs: [], restoredTabs: []});

        expect(restored.tabContentComponent).toBe(DefaultTabbedTaskViewComponent);
        expect((restored.injectedObject as any).baseFilter.getRequestBody()).toEqual([
            {case: {id: '1'}},
            {query: 'state:open'}
        ]);
        expect((restored.injectedObject as any).baseFilter.getRequestParams().operation).toBe(MergeOperator.AND);
    });

    it('should restore a filter tab from its current parent configuration', () => {
        const state: PersistedTabState = {
            persistence: {
                id: 'filter:1',
                type: DEFAULT_FILTER_TAB_TYPE,
                payload: {filterCase: {stringId: '1'}}
            },
            parentPersistenceId: 'root',
            order: 0,
            pinned: false,
            initial: false
        };

        const restored = adapter.restore(state, {
            initialTabs: [{
                canBeClosed: false,
                tabContentComponent: DefaultTabbedCaseViewComponent,
                persistence: {id: 'root', type: 'initial'},
                injectedObject: {navigationItemTaskData: ['current']}
            }],
            restoredTabs: []
        });

        expect(restored.tabContentComponent).toBe(DefaultTabbedCaseViewComponent);
        expect((restored.injectedObject as any).navigationItemTaskData).toEqual(['current']);
        expect((restored.injectedObject as any).filterCase).toEqual({stringId: '1'});
    });
});
