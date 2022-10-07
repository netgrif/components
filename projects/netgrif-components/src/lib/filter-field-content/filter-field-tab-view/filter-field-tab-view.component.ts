import { Component } from '@angular/core';
import {
    TabContent
} from '@netgrif/components-core';
import {
    DefaultTabbedTaskViewComponent
} from '../../navigation/group-navigation-component-resolver/default-components/default-tabbed-task-view/default-tabbed-task-view.component';
import {
    FilterFieldTabbedCaseViewComponent
} from '../filter-field-tabbed-case-view/filter-field-tabbed-case-view.component';

@Component({
  selector: 'nc-filter-field-tab-view',
  templateUrl: './filter-field-tab-view.component.html',
  styleUrls: ['./filter-field-tab-view.component.scss'],
})
export class FilterFieldTabViewComponent {

    tabs: Array<TabContent>;

    constructor() {
        this.tabs = [
            {
                label: {text: 'Test', icon: 'home'},
                canBeClosed: false,
                tabContentComponent: FilterFieldTabbedCaseViewComponent,
                injectedObject: {
                    tabViewComponent: DefaultTabbedTaskViewComponent,
                    tabViewOrder: 0,
                }
            }
        ];
    }

}
