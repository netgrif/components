import {DataField} from '../data-fields/models/abstract-data-field';
import {DataGroup} from '../resources/interface/data-groups';

/**
 * @param fields a collection of data fields
 * @param fieldId the id of the desired field
 * @returns a reference to the datafield with the specified id or `undefined` if such datafield could not be found
 */
export function getField(fields: Array<DataField<any>>, fieldId: string): DataField<any> | undefined {
    return fields.find(field => field.stringId === fieldId);
}

/**
 * @param groups a list of searched data groups
 * @param fieldId the id of the desired field
 * @returns a reference to the first occurrence of the datafield with the specified id or `undefined` if such datafield could not be found
 */
export function getFieldFromDataGroups(groups: Array<DataGroup>, fieldId: string): DataField<any> | undefined {
    for (const group of groups) {
        const inGroup = getField(group.fields, fieldId);
        if (inGroup !== undefined) {
            return inGroup;
        }
    }
    return undefined;
}
