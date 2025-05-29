import {Component, Inject, Injector} from '@angular/core';
import {
    AbstractFilterFieldTabViewContentComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    CategoryFactory,
    CategoryResolverService,
    ComponentRegistryService,
    FilterField,
    NAE_BASE_FILTER,
    NAE_FILTER_FIELD,
    NAE_SEARCH_CATEGORIES,
    SearchService
} from '@netgrif/components-core';
import {
    filterFieldAllowedNetsFactory,
    filterFieldBaseFilterFactory,
    filterFieldCategoriesFactory
} from '../filter-field-content/filter-field-content.component';

@Component({
    selector: 'nc-filter-field-tab-view-content',
    templateUrl: './filter-field-tab-view-content.component.html',
    styleUrls: ['./filter-field-tab-view-content.component.scss'],
    providers: [
        {provide: NAE_BASE_FILTER, useFactory: filterFieldBaseFilterFactory, deps: [NAE_FILTER_FIELD]},
        {
            provide: AllowedNetsService,
            useFactory: filterFieldAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory, NAE_FILTER_FIELD]
        },
        CategoryFactory,
        {
            provide: NAE_SEARCH_CATEGORIES,
            useFactory: filterFieldCategoriesFactory,
            deps: [CategoryResolverService, NAE_FILTER_FIELD]
        },
        SearchService
    ],
    standalone: false
})
export class FilterFieldTabViewContentComponent extends AbstractFilterFieldTabViewContentComponent {

    constructor(registry: ComponentRegistryService,
                injector: Injector,
                @Inject(NAE_FILTER_FIELD) filterField: FilterField,
                searchService: SearchService) {
        super(registry, injector, filterField, searchService)
    }
}
