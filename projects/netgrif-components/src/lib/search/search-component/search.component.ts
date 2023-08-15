import {Component, Inject, Optional, SkipSelf, Type, ViewEncapsulation} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {
    AbstractSearchComponent,
    BaseFilter,
    CategoryResolverService,
    DATE_FORMAT,
    DialogService,
    LoggerService,
    SearchService,
    NAE_SEARCH_COMPONENT_CONFIGURATION,
    SearchComponentConfiguration,
    UserFiltersService,
    AllowedNetsService,
    NAE_SEARCH_CATEGORIES,
    Category,
    ViewIdService,
    NAE_FILTERS_FILTER,
    Filter,
    FilterType,
    NAE_BASE_FILTER,
    NAE_DEFAULT_CASE_SEARCH_CATEGORIES,
    NAE_DEFAULT_TASK_SEARCH_CATEGORIES, NAE_NAVIGATION_ITEM_TASK_DATA, DataGroup
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

/**
 * Converts search categories provided by the {@link NAE_SEARCH_CATEGORIES}
 * injection token in the old (pre 5.6.0) format, to the new format.
 *
 * If no search categories are provided converts the default search categories into search categories
 * based on the base filter filter type.
 *
 * @param categoryResolverService service for serialisation and deserialization of search categories
 * @param baseFilter determines the default categories used if no categories are provided, injected by the {@link NAE_BASE_FILTER}
 * injection token
 * @param defaultCaseSearchCategories the default case search categories, injected by the {@link NAE_DEFAULT_CASE_SEARCH_CATEGORIES}
 * injection token
 * @param defaultTaskSearchCategories the default task search categories, injected by the {@link NAE_DEFAULT_TASK_SEARCH_CATEGORIES}
 * injection token
 * @param naeSearchCategories optionally the search category instances, or the search category classes. Instances are converted to classes.
 * If no categories are provided the default ones based on the base filter filter type will be returned.
 * Injected by the {@link NAE_SEARCH_CATEGORIES} injection token.
 */
export function searchCategoryConverter(categoryResolverService: CategoryResolverService,
                                        baseFilter: BaseFilter,
                                        defaultCaseSearchCategories: Array<Type<Category<any>>>,
                                        defaultTaskSearchCategories: Array<Type<Category<any>>>,
                                        naeSearchCategories: Array<Category<any>> | Array<Type<Category<any>>> = null
): Array<Type<Category<any>>> {
    if (naeSearchCategories === null) {
        // categories were not provided => return the defaults
        const type = baseFilter.filter instanceof Filter ? baseFilter.filter.type : baseFilter.filterType;
        if (type === FilterType.CASE) {
            return defaultCaseSearchCategories;
        } else if (type === FilterType.TASK) {
            return defaultTaskSearchCategories;
        }
        throw new Error(`Illegal filter type: ${type}`);
    }

    // categories were provided => convert them if necessary
    if (naeSearchCategories.length !== 0 && naeSearchCategories[0] instanceof Category) {
        return (naeSearchCategories as Array<Category<any>>).map(c => {
            return categoryResolverService.toClass(categoryResolverService.serialize(c));
        });
    }
    return naeSearchCategories as Array<Type<Category<any>>>;
}

@Component({
    selector: 'nc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT},
        {
            provide: NAE_SEARCH_CATEGORIES,
            useFactory: searchCategoryConverter,
            deps: [
                CategoryResolverService,
                NAE_BASE_FILTER,
                NAE_DEFAULT_CASE_SEARCH_CATEGORIES,
                NAE_DEFAULT_TASK_SEARCH_CATEGORIES,
                [new Optional(), new SkipSelf(), NAE_SEARCH_CATEGORIES]
            ]
        }
    ]
})
export class SearchComponent extends AbstractSearchComponent {

    constructor(searchService: SearchService,
                logger: LoggerService,
                dialogService: DialogService,
                translate: TranslateService,
                userFilterService: UserFiltersService,
                allowedNetsService: AllowedNetsService,
                viewIdService: ViewIdService,
                @Inject(NAE_SEARCH_CATEGORIES) searchCategories: Array<Type<Category<any>>>,
                @Optional() @Inject(NAE_SEARCH_COMPONENT_CONFIGURATION) configuration: SearchComponentConfiguration,
                @Optional() @Inject(NAE_FILTERS_FILTER) filtersFilter: Filter = null,
                @Optional() @Inject(NAE_NAVIGATION_ITEM_TASK_DATA) navigationItemTaskData: Array<DataGroup> = null) {
        super(searchService, logger, dialogService, translate, userFilterService, allowedNetsService,
            viewIdService, searchCategories, configuration, filtersFilter, navigationItemTaskData);
    }
}
