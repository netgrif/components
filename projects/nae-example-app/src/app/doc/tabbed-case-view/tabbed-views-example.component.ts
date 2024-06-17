import {Component, OnInit} from '@angular/core';
import {NAE_TASK_FORCE_OPEN, NAE_VIEW_ID_SEGMENT, TabContent, ViewIdService} from '@netgrif/components-core';
import {TabbedCaseViewComponent} from './tabbed-case-view/tabbed-case-view.component';
import {TabbedTaskViewComponent} from './tabbed-task-view/tabbed-task-view.component';
import {ReplaySubject} from 'rxjs';

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
export class TabbedViewsExampleComponent implements OnInit {
    readonly TITLE = 'Tabbed Views';
    readonly DESCRIPTION = 'Ukážka integracie case-tab-task view';

    tabs: Array<TabContent>;

    constructor() {
        const stream = new ReplaySubject<number>(1);
        const streamTest = new ReplaySubject<number>(1);
        streamTest.next(255)
        this.tabs = [
            {
                label: {
                    text: 'process cache enabled WRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
                    icon: 'storage',
                    count: stream
                },
                canBeClosed: false,
                tabContentComponent: TabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: TabbedTaskViewComponent,
                    tabViewOrder: 0,
                    exampleUseCache: true
                }
            },
            {
                label: {
                    text: 'process cache disabled',
                    icon: 'storage',
                    count: streamTest
                },
                canBeClosed: false,
                tabContentComponent: TabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: TabbedTaskViewComponent,
                    tabViewOrder: 0,
                    exampleUseCache: false
                }
            }
        ];
        setTimeout(() => {
            stream.next(999999);
        }, 2000);
    }

    ngOnInit(): void {
    }

}
