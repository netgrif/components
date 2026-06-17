import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NAE_TASK_FORCE_OPEN, NAE_VIEW_ID_SEGMENT, TabContent, ViewIdService} from '@netgrif/components-core';
import {BuilderTabbedCaseViewComponent} from './builder-tabbed-case-view/builder-tabbed-case-view.component';
import {
    BuilderComponent
} from "@netgrif/components";

@Component({
    selector: 'nae-tabbed-builder-view-example',
    templateUrl: './builder-tabs-example.component.html',
    styleUrls: ['./builder-tabs-example.component.scss'],
    providers: [
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'all-cases'},
        {provide: NAE_TASK_FORCE_OPEN, useValue: false},
        ViewIdService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuilderTabsExampleComponent implements OnInit {

    tabs: Array<TabContent>;

    constructor() {
        this.tabs = [
            {
                label: {
                    text: 'Processes',
                    icon: 'device_hub'
                },
                canBeClosed: false,
                tabContentComponent: BuilderTabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: BuilderComponent,
                    tabViewOrder: 0,
                    exampleUseCache: true
                }
            }
        ];
    }

    ngOnInit(): void {
    }

}
