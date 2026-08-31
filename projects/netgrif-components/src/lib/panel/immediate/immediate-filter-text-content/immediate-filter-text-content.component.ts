import {Component, Inject, Type} from '@angular/core';
import {
    AbstractImmediateFilterTextContentComponent,
    NAE_FILTER_TEXT,
    FilterTextConfiguration,
    SearchService,
    NAE_BASE_FILTER,
    BaseFilter,
    SimpleFilter,
    CategoryFactory,
    Category,
    NAE_SEARCH_CATEGORIES,
    NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY,
    FilterType,
    NAE_DEFAULT_CASE_SEARCH_CATEGORIES,
    NAE_DEFAULT_TASK_SEARCH_CATEGORIES,
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

export function filterTextBaseFilterFactory(configuration: FilterTextConfiguration): BaseFilter {
    return {
        filter: SimpleFilter.empty(configuration.type)
    };
}

export function filterTextCategoriesFactory(configuration: FilterTextConfiguration, caseCategories: Array<Type<Category<any>>>,
                                            taskCategories: Array<Type<Category<any>>>): Array<Type<Category<any>>> {
    if (configuration.type === FilterType.CASE) {
        return caseCategories;
    } else if (configuration.type === FilterType.TASK) {
        return taskCategories;
    }
    return [];
}

@Component({
    selector: 'nc-immediate-filter-text-content',
    templateUrl: './immediate-filter-text-content.component.html',
    styleUrls: ['./immediate-filter-text-content.component.scss'],
    providers: [
        {provide: NAE_BASE_FILTER, useFactory: filterTextBaseFilterFactory, deps: [NAE_FILTER_TEXT]},
        {provide: NAE_IGNORE_NETS_ON_AUTOCOMPLETE_CATEGORY, useValue: true},
        {provide: NAE_SEARCH_CATEGORIES, useFactory: filterTextCategoriesFactory, deps: [NAE_FILTER_TEXT,
                NAE_DEFAULT_CASE_SEARCH_CATEGORIES, NAE_DEFAULT_TASK_SEARCH_CATEGORIES]},
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
