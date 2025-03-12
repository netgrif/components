import {Component, Inject, Injector, Optional} from '@angular/core';
import {ComponentType} from "@angular/cdk/portal";
import {FilterFieldTabViewContentComponent} from "../tab-view-filter-field/filter-field-tab-view-content.component";
import {FilterFieldContentComponent} from "../filter-field-content/filter-field-content.component";
import {
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    FilterField,
    AbstractFilterFieldContentComponent,
    Dashboard, AbstractFilterDefaultFieldComponent, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'nc-filter-default-field',
  templateUrl: './filter-default-field.component.html',
  styleUrls: ['./filter-default-field.component.scss']
})
export class FilterDefaultFieldComponent extends AbstractFilterDefaultFieldComponent {

    constructor(parentInjector: Injector,
                translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FilterField>) {
        super(parentInjector, translate, validationRegistry, dataFieldPortalData);
    }

    protected getFilterContentComponent(): ComponentType<AbstractFilterFieldContentComponent> {
        if (this.dataField.component?.name === Dashboard.FILTER_TAB_VIEW_COMPONENT_ID) {
            return FilterFieldTabViewContentComponent;
        }
        return FilterFieldContentComponent;
    }

}
