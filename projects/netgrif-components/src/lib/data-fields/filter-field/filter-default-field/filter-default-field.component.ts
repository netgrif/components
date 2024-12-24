import {Component, Inject, Injector, Optional} from '@angular/core';
import {ComponentType} from "@angular/cdk/portal";
import {FilterFieldTabViewContentComponent} from "../tab-view-filter-field/filter-field-tab-view-content.component";
import {FilterFieldContentComponent} from "../filter-field-content/filter-field-content.component";
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    FilterField,
    AbstractFilterFieldContentComponent,
    Dashboard, AbstractFilterDefaultFieldComponent
} from '@netgrif/components-core';

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

    protected getFilterContentComponent(): ComponentType<AbstractFilterFieldContentComponent> {
        if (this.dataField.component?.name === Dashboard.FILTER_TAB_VIEW_COMPONENT_ID) {
            return FilterFieldTabViewContentComponent;
        }
        return FilterFieldContentComponent;
    }

}
