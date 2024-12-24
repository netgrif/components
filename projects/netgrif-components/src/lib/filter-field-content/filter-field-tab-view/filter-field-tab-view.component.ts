import { Component, Inject } from '@angular/core';
import {
    ComponentRegistryService,
    AbstractFilterFieldTabViewComponent,
    NAE_FILTER_FIELD,
    FilterField
} from '@netgrif/components-core';
import {
    FilterFieldTabbedCaseViewComponent
} from '../filter-field-tabbed-case-view/filter-field-tabbed-case-view.component';
import {
    FilterFieldTabbedTaskViewComponent
} from "../filter-field-tabbed-task-view/filter-field-tabbed-task-view.component";

@Component({
  selector: 'nc-filter-field-tab-view',
  templateUrl: './filter-field-tab-view.component.html',
  styleUrls: ['./filter-field-tab-view.component.scss'],
})
export class FilterFieldTabViewComponent extends AbstractFilterFieldTabViewComponent {

    constructor(registry: ComponentRegistryService,
                @Inject(NAE_FILTER_FIELD) filterField: FilterField) {
        super(registry, filterField, FilterFieldTabbedCaseViewComponent, FilterFieldTabbedTaskViewComponent);
    }
}
