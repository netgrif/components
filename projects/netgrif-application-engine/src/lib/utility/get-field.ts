import {DataField} from '../data-fields/models/abstract-data-field';

/**
 * @param fields a collection of data fields
 * @param fieldId the id of the desired field
 * @returns a reference to the datafield with the specified id or `undefined` if such datafield could not be found
 */
export function getField(fields: Array<DataField<any>>, fieldId: string): DataField<any> | undefined {
    return fields.find(field => field.stringId === fieldId);
}
