import {DataField} from '../data-fields/models/abstract-data-field';

/**
 * @param fields a collection of data fields
 * @param fieldId the id of the desired field
 * @param taskReffed if the desired field is the content of a task ref field an ID suffix match is used instead of id equality
 * @returns a reference to the datafield with the specified id or `undefined` if such datafield could not be found
 */
export function getField(fields: Array<DataField<any>>, fieldId: string, taskReffed = false): DataField<any> | undefined {
    return fields.find(field => taskReffed ? field.stringId.endsWith('-' + fieldId) : field.stringId === fieldId);
}
