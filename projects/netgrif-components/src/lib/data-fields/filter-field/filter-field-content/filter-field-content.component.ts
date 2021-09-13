import {Component, Inject, Type} from '@angular/core';
import {
    AbstractFilterFieldContentComponent,
    SearchService,
    AllowedNetsService,
    AllowedNetsServiceFactory, FilterField, NAE_FILTER_FIELD, NAE_BASE_FILTER, BaseFilter,
    SimpleFilter, CategoryResolverService, NAE_SEARCH_CATEGORIES, Category, CategoryFactory
} from '@netgrif/application-engine';

export function filterFieldBaseFilterFactory(filterField: FilterField): BaseFilter {
    return {
        filter: SimpleFilter.empty(filterField.filterMetadata.filterType)
    };
}

export function filterFieldAllowedNetsFactory(factory: AllowedNetsServiceFactory, filterField: FilterField): AllowedNetsService {
    return factory.createFromArray(filterField.allowedNets);
}

export function filterFieldCategoriesFactory(factory: CategoryResolverService, filterField: FilterField): Array<Type<Category<any>>> {
    const result = filterField.filterMetadata.searchCategories.map(c => factory.toClass(c));
    return result;
}

@Component({
    selector: 'nc-filter-field-content',
    templateUrl: './filter-field-content.component.html',
    styleUrls: ['./filter-field-content.component.scss'],
    providers: [
        {provide: NAE_BASE_FILTER, useFactory: filterFieldBaseFilterFactory, deps: [NAE_FILTER_FIELD]},
        {provide: AllowedNetsService, useFactory: filterFieldAllowedNetsFactory, deps: [AllowedNetsServiceFactory, NAE_FILTER_FIELD]},
        CategoryFactory,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: filterFieldCategoriesFactory, deps: [CategoryResolverService, NAE_FILTER_FIELD]},
        SearchService
    ]
})
export class FilterFieldContentComponent extends AbstractFilterFieldContentComponent {

    constructor(@Inject(NAE_FILTER_FIELD) filterField: FilterField,
                fieldSearchService: SearchService) {
        super(filterField, fieldSearchService);
    }

}
