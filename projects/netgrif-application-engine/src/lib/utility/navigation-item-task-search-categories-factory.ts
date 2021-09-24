import {Type} from '@angular/core';
import {Category} from '../search/models/category/category';
import {UserFilterConstants} from '../filter/models/user-filter-constants';
import {getField} from './get-field';
import {FilterField} from '../data-fields/filter-field/models/filter-field';
import {DataGroup} from '../resources/interface/data-groups';
import {CategoryResolverService} from '../search/category-factory/category-resolver.service';
import {FilterType} from '../filter/models/filter-type';

/**
 * Creates search categories based on the metadata stored in the filter case
 * @param categoryResolverService
 * @param navigationItemTaskData task data of a navigation item task, the data must contain a filter field, that is used
 * to generate the categories
 * @param defaultCaseSearchCategories the default case search categories that should be merged with the categories provided by the filter
 * field, if the filter metadata allow it and the filter is a case filter
 * @param defaultTaskSearchCategories the default task search categories that should be merged with the categories provided by the filter
 * field, if the filter metadata allow it and the filter is a task filter
 */
export function navigationItemTaskCategoryFactory(categoryResolverService: CategoryResolverService,
                                                  navigationItemTaskData: Array<DataGroup>,
                                                  defaultCaseSearchCategories: Array<Type<Category<any>>>,
                                                  defaultTaskSearchCategories: Array<Type<Category<any>>>): Array<Type<Category<any>>> {
    const filterField = getField(navigationItemTaskData[navigationItemTaskData.length - 1].fields,
        UserFilterConstants.FILTER_FIELD_ID) as FilterField;

    if (filterField === undefined) {
        throw new Error(
            `Provided navigation item task data does not contain a filter field! Search categories cannot be generated from it!`);
    }

    const merge = new Set();
    const cats = filterField.filterMetadata.searchCategories.map(cat => {
        const category = categoryResolverService.toClass(cat);
        merge.add(category);
        return category;
    });

    if (filterField.filterMetadata.defaultSearchCategories) {
        (filterField.filterMetadata.filterType === FilterType.CASE ? defaultCaseSearchCategories : defaultTaskSearchCategories)
            .forEach(cat => {
                if (!merge.has(cat)) {
                    cats.push(cat);
                }
            });
    }

    return cats;
}
