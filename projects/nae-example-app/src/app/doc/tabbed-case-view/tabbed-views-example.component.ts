import {Component} from '@angular/core';
import {
    HeaderSortingMode,
    NAE_TASK_FORCE_OPEN,
    NAE_VIEW_ID_SEGMENT,
    TabContent,
    ViewIdService
} from '@netgrif/components-core';
import {TabbedCaseViewComponent} from './tabbed-case-view/tabbed-case-view.component';
import {TabbedTaskViewComponent} from './tabbed-task-view/tabbed-task-view.component';
import {ReplaySubject} from 'rxjs';
import {TabbedViewsPersistenceAdapter} from './tabbed-views-persistence-adapter';

@Component({
    selector: 'nae-app-tabbed-views-example',
    templateUrl: './tabbed-views-example.component.html',
    styleUrls: ['./tabbed-views-example.component.scss'],
    providers: [
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'all-cases'},
        {provide: NAE_TASK_FORCE_OPEN, useValue: false},
        ViewIdService
    ]
})
export class TabbedViewsExampleComponent {
    readonly TITLE = 'Tabbed Views';
    readonly DESCRIPTION = 'Ukážka integracie case-tab-task view';

    tabs: Array<TabContent>;
    readonly persistenceKey = 'nae-example:tabbed-views';
    readonly persistenceAdapter = new TabbedViewsPersistenceAdapter();

    constructor() {
        const stream = new ReplaySubject<number>(1);
        const streamTest = new ReplaySubject<number>(1);
        streamTest.next(255);
        this.tabs = [
            {
                label: {
                    text: 'process cache enabled WRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR — single',
                    icon: 'storage',
                    count: stream
                },
                canBeClosed: false,
                persistence: {id: 'cache-enabled-single', type: 'initial'},
                tabContentComponent: TabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: TabbedTaskViewComponent,
                    tabViewOrder: 0,
                    exampleUseCache: true,
                    headerSortingMode: HeaderSortingMode.SINGLE
                }
            },
            {
                label: {
                    text: 'process cache disabled — multi',
                    icon: 'storage',
                    count: streamTest
                },
                canBeClosed: false,
                persistence: {id: 'cache-disabled-multi', type: 'initial'},
                tabContentComponent: TabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: TabbedTaskViewComponent,
                    tabViewOrder: 0,
                    exampleUseCache: false,
                    headerSortingMode: HeaderSortingMode.MULTI,
                    showCasePanelIcon: false
                }
            },
            {
                label: {
                    text: 'process cache enabled — combined (edit multi / normal single)',
                    icon: 'storage'
                },
                canBeClosed: false,
                persistence: {id: 'cache-enabled-combined', type: 'initial'},
                tabContentComponent: TabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: TabbedTaskViewComponent,
                    tabViewOrder: 0,
                    exampleUseCache: true,
                    headerSortingMode: HeaderSortingMode.COMBINED
                }
            }
        ];
        setTimeout(() => {
            stream.next(999999);
        }, 2000);
    }
}
