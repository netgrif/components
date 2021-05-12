import {Component, Inject} from '@angular/core';
import {
    AbstractImmediateFilterTextContentComponent,
    NAE_FILTER_TEXT,
    FilterTextConfiguration,
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
import {TranslateService} from '@ngx-translate/core';

export function filterTextBaseFilterFactory(configuration: FilterTextConfiguration): BaseFilter {
    return {
        filter: SimpleFilter.empty(configuration.metadata.filterMetadata.filterType)
    };
}

export function filterTextAllowedNetsFactory(factory: AllowedNetsServiceFactory,
                                             configuration: FilterTextConfiguration): AllowedNetsService {
    return factory.createFromArray(configuration.metadata.allowedNets);
}

export function filterTextCategoriesFactory(factory: CategoryFactory, configuration: FilterTextConfiguration): Array<Category<any>> {
    const categories = configuration.metadata.filterMetadata.searchCategories.map(c => factory.getByNameWithDefaultOperator(c));
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

    constructor(@Inject(NAE_FILTER_TEXT) configuration: FilterTextConfiguration,
                textSearchService: SearchService,
                translateService: TranslateService) {
        super(configuration, textSearchService, translateService);
    }

}
