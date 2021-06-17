import {Category} from '../search/models/category/category';
import {CategoryFactory} from '../search/category-factory/category-factory';
import {UserFilterConstants} from '../filter/models/user-filter-constants';
import {getField} from './get-field';
import {FilterField} from '../data-fields/filter-field/models/filter-field';
import {DataGroup} from '../resources/interface/data-groups';

/**
 * Creates search categories based on the metadata stored in the filter case
 * @param categoryFactory
 * @param navigationItemTaskData
 */
export function navigationItemTaskCategoryFactory(categoryFactory: CategoryFactory,
                                                  navigationItemTaskData: Array<DataGroup>): Array<Category<any>> {
    const filterField = getField(navigationItemTaskData[navigationItemTaskData.length - 1].fields,
        UserFilterConstants.FILTER_FIELD_ID, true) as FilterField;

    if (filterField === undefined) {
        throw new Error(
            `Provided navigation item task data does not contain a filter field! Search categories cannot be generated from it!`);
    }

    const cats = filterField.filterMetadata.searchCategories.map(cat => categoryFactory.getByNameWithDefaultOperator(cat));
    cats.forEach(cat => cat.destroy());
    return cats;
}
