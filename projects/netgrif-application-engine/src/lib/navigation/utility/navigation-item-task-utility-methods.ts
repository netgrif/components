import {GroupNavigationItemLabel} from '../model/group-navigation-item-label';
import {DataGroup} from '../../resources/interface/data-groups';
import {getField} from '../../utility/get-field';
import {GroupNavigationConstants} from '../model/group-navigation-constants';
import {Filter} from '../../filter/models/filter';
import {UserFilterConstants} from '../../filter/models/user-filter-constants';
import {FilterField} from '../../data-fields/filter-field/models/filter-field';
import {SimpleFilter} from '../../filter/models/simple-filter';

/**
 * Extracts the item name and item icon (if any) rom a section of the navigation item task data.
 * @param dataSection an array containing the data groups that correspond to a single navigation entry
 * @param taskReffed whether the provided data is contained in a task ref field or not. Data is assumed to NOT be task reffed by default.
 */
export function extractIconAndTitle(dataSection: Array<DataGroup>, taskReffed = false): GroupNavigationItemLabel {
    const result: GroupNavigationItemLabel = {name: ''};

    if (dataSection.length === 0) {
        throw new Error('The provided task data does not belong to a Navigation menu item task. Icon and title cannot be extracted');
    }

    // "first" datagroup has name and icon
    const nameField = getField(dataSection[0].fields,
        GroupNavigationConstants.NAVIGATION_ENTRY_TITLE_FIELD_ID_SUFFIX, taskReffed);

    if (nameField === undefined) {
        throw new Error('Navigation entry name could not be resolved');
    }
    result.name = nameField.value;

    const useIcon = getField(dataSection[0].fields,
        GroupNavigationConstants.NAVIGATION_ENTRY_ICON_ENABLED_FIELD_ID_SUFFIX, taskReffed);
    if (useIcon !== undefined && useIcon.value) {
        const icon = getField(dataSection[0].fields,
            GroupNavigationConstants.NAVIGATION_ENTRY_ICON_FIELD_ID_SUFFIX, taskReffed);
        if (icon === undefined) {
            this._log.error('Navigation entry icon could not be resolved, but is enabled. Icon was ignored');
        } else {
            result.icon = icon.value;
        }
    }
    return result;
}

/**
 * Extracts the data and creates a filter object from the navigation item task data.
 * @param dataSection an array containing the data groups that correspond to a single navigation entry
 * @param taskReffed whether the provided data is contained in a task ref field or not. Data is assumed TO BE task reffed by default.
 */
export function extractFilterFromData(dataSection: Array<DataGroup>, taskReffed = true): Filter {
    return extractFilterFromFilterField(extractFilterFieldFromData(dataSection, taskReffed));
}

/**
 * Extracts the filter field from the navigation item task data.
 * @param dataSection an array containing the data groups that correspond to a single navigation entry
 * @param taskReffed whether the provided data is contained in a task ref field or not. Data is assumed TO BE task reffed by default.
 * @returns The extracted {@link FilterField} or `undefined` if it could not be extracted.
 */
export function extractFilterFieldFromData(dataSection: Array<DataGroup>, taskReffed = true): FilterField | undefined {
    if (dataSection.length < 2) {
        throw new Error('The provided task data does not belong to a Navigation menu item task. Filter cannot be extracted');
    }

    // "second" datagroup has filter
    const filterField = getField(dataSection[1].fields, UserFilterConstants.FILTER_FIELD_ID, taskReffed);

    if (filterField === undefined || !(filterField instanceof FilterField)) {
        return undefined;
    }

    return filterField;
}

/**
 * @returns a {@link SimpleFilter} containing the filter stored in the provided {@link FilterField}.
 * Throws an error if this is not possible.
 */
export function extractFilterFromFilterField(filterField: FilterField): Filter {
    if (filterField === undefined || !(filterField instanceof FilterField)) {
        throw new Error('Filter could not be resolved');
    }
    return SimpleFilter.fromQuery({query: filterField.value}, filterField.filterMetadata.filterType);
}
