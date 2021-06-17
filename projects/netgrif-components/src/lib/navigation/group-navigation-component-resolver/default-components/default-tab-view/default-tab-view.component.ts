import {Component, Inject} from '@angular/core';
import {ViewIdService, TabContent, NAE_NAVIGATION_ITEM_TASK_DATA, Task, DataGroup, extractIconAndTitle} from '@netgrif/application-engine';
import {DefaultTabbedCaseViewComponent} from '../default-tabbed-case-view/default-tabbed-case-view.component';
import {DefaultTabbedTaskViewComponent} from '../default-tabbed-task-view/default-tabbed-task-view.component';

@Component({
    selector: 'nc-default-tab-view',
    templateUrl: './default-tab-view.component.html',
    styleUrls: ['./default-tab-view.component.scss'],
    providers: [
        {provide: ViewIdService, useValue: null},
    ]
})
export class DefaultTabViewComponent {

    tabs: Array<TabContent>;

    constructor(@Inject(NAE_NAVIGATION_ITEM_TASK_DATA) protected _navigationItemTaskData: Array<DataGroup>) {
        const labelData = extractIconAndTitle(this._navigationItemTaskData);
        this.tabs = [
            {
                label: {text: labelData.name, icon: labelData.icon},
                canBeClosed: false,
                tabContentComponent: DefaultTabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: DefaultTabbedTaskViewComponent,
                    tabViewOrder: 0,
                    navigationItemTaskData: this._navigationItemTaskData
                }
            }
        ];
    }

}
