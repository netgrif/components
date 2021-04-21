import {Component, Inject} from '@angular/core';
import {
    AbstractImmediateFilterTextContentComponent,
    NAE_FILTER_TEXT,
    FilterMetadataAllowedNets,
    SearchService,
    NAE_BASE_FILTER,
    BaseFilter,
    SimpleFilter,
    AllowedNetsServiceFactory,
    AllowedNetsService,
    CategoryFactory,
    Category,
    NAE_SEARCH_CATEGORIES,
} from '@netgrif/application-engine';

export function filterTextBaseFilterFactory(metadata: FilterMetadataAllowedNets): BaseFilter {
    return {
        filter: SimpleFilter.empty(metadata.filterMetadata.filterType)
    };
}

export function filterTextAllowedNetsFactory(factory: AllowedNetsServiceFactory,
                                             metadata: FilterMetadataAllowedNets): AllowedNetsService {
    return factory.createFromArray(metadata.allowedNets);
}

export function filterTextCategoriesFactory(factory: CategoryFactory, metadata: FilterMetadataAllowedNets): Array<Category<any>> {
    const categories = metadata.filterMetadata.searchCategories.map(c => factory.getByNameWithDefaultOperator(c));
    categories.forEach(c => c.destroy());
    return categories;
}

@Component({
    selector: 'nc-immediate-filter-text-content',
    templateUrl: './immediate-filter-text-content.component.html',
    styleUrls: ['./immediate-filter-text-content.component.scss'],
    providers: [
        {provide: NAE_BASE_FILTER, useFactory: filterTextBaseFilterFactory, deps: [NAE_FILTER_TEXT]},
        {provide: AllowedNetsService, useFactory: filterTextAllowedNetsFactory, deps: [AllowedNetsServiceFactory, NAE_FILTER_TEXT]},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: filterTextCategoriesFactory, deps: [CategoryFactory, NAE_FILTER_TEXT]},
        CategoryFactory,
        SearchService,
    ]
})
export class ImmediateFilterTextContentComponent extends AbstractImmediateFilterTextContentComponent {

    constructor(@Inject(NAE_FILTER_TEXT) filterMetadata: FilterMetadataAllowedNets, textSearchService: SearchService) {
        super(filterMetadata, textSearchService);
    }

}
