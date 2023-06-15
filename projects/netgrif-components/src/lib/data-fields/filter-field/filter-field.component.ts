import {Component, Inject, Injector, Optional} from '@angular/core';
import {
    AbstractFilterFieldComponent,
    AbstractFilterFieldContentComponent, Dashboard,
    NAE_INFORM_ABOUT_INVALID_DATA
} from '@netgrif/components-core';
import {ComponentType} from '@angular/cdk/portal';
import {FilterFieldContentComponent} from './filter-field-content/filter-field-content.component';
import { FilterFieldTabViewContentComponent } from './tab-view-filter-field/filter-field-tab-view-content.component';

@Component({
    selector: 'nc-filter-field',
    templateUrl: './filter-field.component.html',
    styleUrls: ['./filter-field.component.scss']
})
export class FilterFieldComponent extends AbstractFilterFieldComponent {

    constructor(parentInjector: Injector,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(parentInjector, informAboutInvalidData);
    }

    protected getFilterContentComponent(): ComponentType<AbstractFilterFieldContentComponent> {
        if (this.dataField.component?.name === Dashboard.FILTER_TAB_VIEW_COMPONENT_ID) {
            return FilterFieldTabViewContentComponent;
        }
        return FilterFieldContentComponent;
    }
}
