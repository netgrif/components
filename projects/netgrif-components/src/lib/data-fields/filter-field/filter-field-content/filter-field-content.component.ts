import {Component, Inject} from '@angular/core';
import {
    AbstractFilterFieldContentComponent,
    SearchService,
    AllowedNetsService,
    AllowedNetsServiceFactory, FilterField, NAE_FILTER_FIELD, NAE_BASE_FILTER, BaseFilter,
    SimpleFilter, CategoryFactory, NAE_SEARCH_CATEGORIES, Category
} from '@netgrif/application-engine';

export function filterFieldBaseFilterFactory(filterField: FilterField): BaseFilter {
    return {
        filter: SimpleFilter.empty(filterField.filterMetadata.filterType)
    };
}

export function filterFieldAllowedNetsFactory(factory: AllowedNetsServiceFactory, filterField: FilterField): AllowedNetsService {
    return factory.createFromArray(filterField.allowedNets);
}

export function filterFieldCategoriesFactory(factory: CategoryFactory, filterField: FilterField): Array<Category<any>> {
    const categories = filterField.filterMetadata.searchCategories.map(c => factory.getByNameWithDefaultOperator(c));
    categories.forEach(c => c.destroy());
    return categories;
}

@Component({
    selector: 'nc-filter-field-content',
    templateUrl: './filter-field-content.component.html',
    styleUrls: ['./filter-field-content.component.scss'],
    providers: [
        {provide: NAE_BASE_FILTER, useFactory: filterFieldBaseFilterFactory, deps: [NAE_FILTER_FIELD]},
        {provide: AllowedNetsService, useFactory: filterFieldAllowedNetsFactory, deps: [AllowedNetsServiceFactory, NAE_FILTER_FIELD]},
        CategoryFactory,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: filterFieldCategoriesFactory, deps: [CategoryFactory, NAE_FILTER_FIELD]},
        SearchService
    ]
})
export class FilterFieldContentComponent extends AbstractFilterFieldContentComponent {

    constructor(@Inject(NAE_FILTER_FIELD) filterField: FilterField,
                fieldSearchService: SearchService) {
        super(filterField, fieldSearchService);
    }

}
