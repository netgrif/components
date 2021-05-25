import {Category} from '../search/models/category/category';
import {CategoryFactory} from '../search/category-factory/category-factory';
import {Case} from '../resources/interface/case';
import {getImmediateData} from './get-immediate-data';
import {UserFilterConstants} from '../filter/models/user-filter-constants';

/**
 * Creates search categories based on the metadata stored in the filter case
 * @param categoryFactory
 * @param filterCase
 */
export function filterCaseSearchCategoriesFactory(categoryFactory: CategoryFactory, filterCase: Case): Array<Category<any>> {
    const filterField = getImmediateData(filterCase, UserFilterConstants.FILTER_FIELD_ID);
    if (filterField === undefined) {
        throw new Error(`Provided case with id '${filterCase.stringId
        }' is not a filter process instance! Categories cannot be generated from it!`);
    }

    const cats = filterField.filterMetadata.searchCategories.map(cat => categoryFactory.getByNameWithDefaultOperator(cat));
    cats.forEach(cat => cat.destroy());
    return cats;
}
