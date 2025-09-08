import {DataField} from '../data-fields/models/abstract-data-field';

/**
 * @param fields a collection of data fields
 * @param fieldId the id of the desired field
 * @returns a reference to the datafield with the specified id or `undefined` if such datafield could not be found
 */
export function getField(fields: Array<DataField<any>>, fieldId: string): DataField<any> | undefined {
    const index = getFieldIndex(fields, fieldId);
    return index === -1 ? undefined : fields[index];
}

/**
 * @param fields a collection of data fields
 * @param fieldId the id of the desired field
 * @returns the index of the datafield with the specified id or `-1` if such datafield could not be found
 */
export function getFieldIndex(fields: Array<DataField<any>>, fieldId: string): number {
    return fields.findIndex(field => field.stringId === fieldId);
}

/**
 * @param groups a list of searched data groups
 * @param fieldId the id of the desired field
 * @returns a reference to the first occurrence of the datafield with the specified id or `undefined` if such datafield could not be found
 */
export function getFieldFromDataGroups(groups: Array<DataField<any>>, fieldId: string): DataField<any> | undefined {
    return groups.find(item => item.stringId === fieldId);
}

/**
 * @param groups a list of searched data groups
 * @param fieldId the id of the desired field
 * @returns an object containing the index of the data group and the field within it corresponding to the first occurrence of a
 * datafield with the specified id or `undefined` if such datafield could not be found
 */
export function getFieldIndexFromDataGroups(groups: Array<DataField<any>>, fieldId: string): number {
    return groups.findIndex(item => item.stringId === fieldId);
}

