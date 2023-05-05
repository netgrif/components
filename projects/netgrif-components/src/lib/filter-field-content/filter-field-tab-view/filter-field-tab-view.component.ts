import { Component, Inject, Type } from '@angular/core';
import {
    DashboardPortalComponentRegistryService,
    AbstractFilterFieldTabViewComponent,
    NAE_FILTER_FIELD,
    FilterField
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
export class FilterFieldTabViewComponent extends AbstractFilterFieldTabViewComponent {

    constructor(registry: DashboardPortalComponentRegistryService,
                @Inject(NAE_FILTER_FIELD) filterField: FilterField) {
        super(registry, filterField, FilterFieldTabbedCaseViewComponent, DefaultTabbedTaskViewComponent);
    }
}
