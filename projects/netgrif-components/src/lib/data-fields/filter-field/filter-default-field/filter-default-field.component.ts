import {Component, Inject, Injector, Optional} from '@angular/core';
import {ComponentType} from "@angular/cdk/portal";
import {FilterFieldTabViewContentComponent} from "../tab-view-filter-field/filter-field-tab-view-content.component";
import {FilterFieldContentComponent} from "../filter-field-content/filter-field-content.component";
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    FilterField,
    AbstractFilterFieldContentComponent,
    Dashboard,
    AbstractFilterDefaultFieldComponent,
    AbstractFilterStringQueryFieldComponent
} from '@netgrif/components-core';
import {FilterStringQueryFieldComponent} from "../filter-string-query-field/filter-string-query-field.component";

@Component({
  selector: 'nc-filter-default-field',
  templateUrl: './filter-default-field.component.html',
  styleUrls: ['./filter-default-field.component.scss']
})
export class FilterDefaultFieldComponent extends AbstractFilterDefaultFieldComponent {

    constructor(parentInjector: Injector,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FilterField>) {
        super(parentInjector, dataFieldPortalData);
    }

    protected override getFilterContentComponent(): ComponentType<AbstractFilterFieldContentComponent | AbstractFilterStringQueryFieldComponent> {
        const componentName: string = this.dataField.component?.name;
        if (componentName === Dashboard.FILTER_TAB_VIEW_COMPONENT_ID) {
            return FilterFieldTabViewContentComponent;
        } else if (componentName === 'string-query') {
            return FilterStringQueryFieldComponent;
        } else if (componentName === 'advanced-search-query') {
            return FilterFieldContentComponent;
        }
        return FilterStringQueryFieldComponent;
    }

}
