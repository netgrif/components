import {DataField} from '../data-fields/models/abstract-data-field';
import {DataGroup} from '../resources/interface/data-groups';

/**
 * @param fields a collection of data fields
 * @param fieldId the id of the desired field
 * @param taskReffed if the desired field is the content of a task ref field an ID suffix match is used instead of id equality
 * @returns a reference to the datafield with the specified id or `undefined` if such datafield could not be found
 */
export function getField(fields: Array<DataField<any>>, fieldId: string, taskReffed = false): DataField<any> | undefined {
    const index = getFieldIndex(fields, fieldId, taskReffed);
    return index === -1 ? undefined : fields[index];
}

/**
 * @param fields a collection of data fields
 * @param fieldId the id of the desired field
 * @param taskReffed if the desired field is the content of a task ref field an ID suffix match is used instead of id equality
 * @returns the index of the datafield with the specified id or `-1` if such datafield could not be found
 */
export function getFieldIndex(fields: Array<DataField<any>>, fieldId: string, taskReffed = false): number {
    return fields.findIndex(field => taskReffed ? field.stringId.endsWith('-' + fieldId) : field.stringId === fieldId);
}

/**
 * @param groups a list of searched data groups
 * @param fieldId the id of the desired field
 * @param taskReffed if the desired field is the content of a task ref field an ID suffix match is used instead of id equality
 * @returns a reference to the first occurrence of the datafield with the specified id or `undefined` if such datafield could not be found
 */
export function getFieldFromDataGroups(groups: Array<DataGroup>, fieldId: string, taskReffed = false): DataField<any> | undefined {
    const indices = getFieldIndexFromDataGroups(groups, fieldId, taskReffed);
    if (indices !== undefined) {
        return groups[indices.dataGroupIndex].fields[indices.fieldIndex];
    }
    return undefined;
}

/**
 * @param groups a list of searched data groups
 * @param fieldId the id of the desired field
 * @param taskReffed if the desired field is the content of a task ref field an ID suffix match is used instead of id equality
 * @returns an object containing the index of the data group and the field within it corresponding to the first occurrence of a
 * datafield with the specified id or `undefined` if such datafield could not be found
 */
export function getFieldIndexFromDataGroups(groups: Array<DataGroup>,
                                            fieldId: string,
                                            taskReffed = false): DataGroupFieldIndex | undefined {
    for (let i = 0; i < groups.length; i++) {
        const fieldIndex = getFieldIndex(groups[i].fields, fieldId, taskReffed);
        if (fieldIndex !== -1) {
            return {
                dataGroupIndex: i,
                fieldIndex
            };
        }
    }
    return undefined;
}

/**
 * Contains the index of the data group and the index of the field within it that contains some data field
 */
export interface DataGroupFieldIndex {
    dataGroupIndex: number;
    fieldIndex: number;
}
