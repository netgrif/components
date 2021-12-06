import {Component, OnInit} from '@angular/core';
import {NAE_VIEW_ID_SEGMENT, TabContent, ViewIdService} from '@netgrif/application-engine';
import {TabbedCaseViewComponent} from './tabbed-case-view/tabbed-case-view.component';
import {TabbedTaskViewComponent} from './tabbed-task-view/tabbed-task-view.component';
import {ReplaySubject} from 'rxjs';

@Component({
    selector: 'nae-app-tabbed-views-example',
    templateUrl: './tabbed-views-example.component.html',
    styleUrls: ['./tabbed-views-example.component.scss'],
    providers: [
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'all-cases'},
        ViewIdService
    ]
})
export class TabbedViewsExampleComponent implements OnInit {
    readonly TITLE = 'Tabbed Views';
    readonly DESCRIPTION = 'Ukážka integracie case-tab-task view';

    tabs: Array<TabContent>;

    constructor() {
        const stream = new ReplaySubject<number>(1);
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
                    icon: 'storage'
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
