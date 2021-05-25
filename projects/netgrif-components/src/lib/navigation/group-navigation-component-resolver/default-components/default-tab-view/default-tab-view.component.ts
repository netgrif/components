import {Component, Inject} from '@angular/core';
import {ViewIdService, TabContent, NAE_FILTER_CASE, Case} from '@netgrif/application-engine';
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

    constructor(@Inject(NAE_FILTER_CASE) protected _filterCase: Case) {
        this.tabs = [
            {
                label: {
                    text: this._filterCase.title
                },
                canBeClosed: false,
                tabContentComponent: DefaultTabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: DefaultTabbedTaskViewComponent,
                    tabViewOrder: 0
                }
            }
        ];
    }

}
