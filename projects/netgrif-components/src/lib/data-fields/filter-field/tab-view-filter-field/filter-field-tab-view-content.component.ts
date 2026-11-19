import {Component, Inject, Injector, Optional, ChangeDetectionStrategy} from '@angular/core';
import {
    ComponentRegistryService,
    NAE_FILTER_FIELD,
    FilterField,
    SearchService,
    AbstractFilterFieldTabViewContentComponent,
    NAE_BASE_FILTER,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    CategoryFactory, NAE_SEARCH_CATEGORIES, CategoryResolverService, DATA_FIELD_PORTAL_DATA, DataFieldPortalData
} from '@netgrif/components-core';
import {
    filterFieldAllowedNetsFactory,
    filterFieldBaseFilterFactory, filterFieldCategoriesFactory
} from '../filter-field-content/filter-field-content.component';

@Component({
  selector: 'nc-filter-field-tab-view-content',
  templateUrl: './filter-field-tab-view-content.component.html',
    providers: [
        {provide: NAE_BASE_FILTER, useFactory: filterFieldBaseFilterFactory, deps: [NAE_FILTER_FIELD]},
        {provide: AllowedNetsService, useFactory: filterFieldAllowedNetsFactory, deps: [AllowedNetsServiceFactory, NAE_FILTER_FIELD]},
        CategoryFactory,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: filterFieldCategoriesFactory, deps: [CategoryResolverService, NAE_FILTER_FIELD]},
        SearchService
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FilterFieldTabViewContentComponent extends AbstractFilterFieldTabViewContentComponent{

    constructor(registry: ComponentRegistryService,
                injector: Injector,
                @Inject(NAE_FILTER_FIELD) filterField: FilterField,
                searchService: SearchService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FilterField>) {
        super(registry, injector, filterField, searchService, dataFieldPortalData)
    }
}
