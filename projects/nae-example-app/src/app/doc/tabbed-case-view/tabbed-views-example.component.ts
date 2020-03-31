import {Component, OnInit} from '@angular/core';
import {TabContent} from '@netgrif/application-engine';
import {TabbedCaseViewComponent} from './tabbed-case-view/tabbed-case-view.component';
import {Content2Component} from './tabbed-task-view/content-2.component';

@Component({
    selector: 'nae-app-tabbed-views-example',
    templateUrl: './tabbed-views-example.component.html',
    styleUrls: ['./tabbed-views-example.component.scss']
})
export class TabbedViewsExampleComponent implements OnInit {
    readonly TITLE = 'Tabbed Views';
    readonly DESCRIPTION = 'Ukážka integracie case-tab-task view';

    tabs: Array<TabContent> = [
        {
            label: {
                text: 'case view',
                icon: 'storage'
            },
            canBeDeleted: false,
            tabContentComponent: TabbedCaseViewComponent,
            injectedObject: {
                tabViewComponent: Content2Component,
                tabViewOrder: 0
            }
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
