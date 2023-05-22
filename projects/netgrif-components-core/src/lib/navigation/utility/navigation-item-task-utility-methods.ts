import {GroupNavigationItemLabel} from '../model/group-navigation-item-label';
import {DataGroup} from '../../resources/interface/data-groups';
import {getFieldFromDataGroups} from '../../utility/get-field';
import {GroupNavigationConstants} from '../model/group-navigation-constants';
import {Filter} from '../../filter/models/filter';
import {UserFilterConstants} from '../../filter/models/user-filter-constants';
import {FilterField} from '../../data-fields/filter-field/models/filter-field';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {MultichoiceField} from '../../data-fields/multichoice-field/models/multichoice-field';
import {SearchMode} from "../../search/models/component-configuration/search-mode";

/**
 * Extracts the item name and item icon (if any) rom a section of the navigation item task data.
 * @param dataSection an array containing the data groups that correspond to a single navigation entry
 */
export function extractIconAndTitle(dataSection: Array<DataGroup>): GroupNavigationItemLabel {
    const result: GroupNavigationItemLabel = {name: ''};

    if (dataSection.length === 0) {
        throw new Error('The provided task data does not belong to a Navigation menu item task. Icon and title cannot be extracted');
    }

    const nameField = getFieldFromDataGroups(dataSection, GroupNavigationConstants.NAVIGATION_ENTRY_TITLE_FIELD_ID_SUFFIX);

    if (nameField === undefined) {
        throw new Error('Navigation name could not be resolved');
    }
    result.name = nameField.value.defaultValue;

    const useIcon = getFieldFromDataGroups(dataSection, GroupNavigationConstants.NAVIGATION_ENTRY_ICON_ENABLED_FIELD_ID_SUFFIX);
    if (useIcon !== undefined && useIcon.value) {
        const icon = getFieldFromDataGroups(dataSection, GroupNavigationConstants.NAVIGATION_ENTRY_ICON_FIELD_ID_SUFFIX);
        if (icon === undefined) {
            this._log.error('Navigation entry icon could not be resolved, but is enabled. Icon was ignored');
        } else {
            result.icon = icon.value;
        }
    }
    return result;
}

/**
 * Based on provided parameter extracts allowed or banned roles into an Array of strings from a section of the navigation item task data.
 * Each item has format ROLE_IMPORT_ID:NET_IMPORT_ID
 * @param dataSection an array containing the data groups that correspond to a single navigation entry
 * @param roleFieldId ID of field containing banned or allowed role IDs
 * @returns an Array of string values representing role IDs
 */
export function extractRoles(dataSection: Array<DataGroup>, roleFieldId: string): Array<string> {
    if (dataSection.length === 0) {
        throw new Error('The provided task data does not belong to a Navigation menu item task. Role entries cannot be extracted');
    }

    const roleIds = getFieldFromDataGroups(dataSection, roleFieldId);
    if (roleIds === undefined) {
        throw new Error('Navigation entry role authorization field could not be resolved');
    }

    return (roleIds as unknown as MultichoiceField).choices.map(choice => choice.key);
}

/**
 * Extracts the data and creates a filter object from the navigation item task data.
 * @param dataSection an array containing the data groups that correspond to a single navigation entry
 */
export function extractFilterFromData(dataSection: Array<DataGroup>): Filter {
    return extractFilterFromFilterField(extractFilterFieldFromData(dataSection));
}

/**
 * Extracts the filter field from the navigation item task data.
 * @param dataSection an array containing the data groups that correspond to a single navigation entry
 * @returns The extracted {@link FilterField} or `undefined` if it could not be extracted.
 */
export function extractFilterFieldFromData(dataSection: Array<DataGroup>): FilterField | undefined {
    const filterField = getFieldFromDataGroups(dataSection, UserFilterConstants.FILTER_FIELD_ID);

    if (filterField === undefined || !(filterField instanceof FilterField)) {
        throw new Error(`Filter could not be extracted. The provided datagroups do not contain a filter field with ID '${
            UserFilterConstants.FILTER_FIELD_ID}'`);
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

/**
 * Extracts the selected search type from enumeration field of the navigation item task data.
 * @returns a {@link SearchMode} containing {@link SearchMode.ADVANCED} or {@link SearchMode.FULLTEXT} or {@link undefined}
 * if unexpected value is found
 * */
export function extractSearchTypeFromData(dataSection: Array<DataGroup>, typeFieldId: string): SearchMode {
    const typeField = getFieldFromDataGroups(dataSection, typeFieldId);
    if (typeField === undefined) {
        throw new Error('Navigation entry search type field could not be resolved');
    }

    switch (typeField.value) {
        case 'fulltext':
            return SearchMode.FULLTEXT;
        case 'fulltext_advanced':
            return SearchMode.ADVANCED;
        default:
            return undefined
    }
}
