import {DataField} from "../../../data-fields/models/abstract-data-field";
import {DataGroup} from "../../interface/data-groups";
import {FieldConverterService} from "../../../task-content/services/field-converter.service";


/**
 * Processes raw data groups from the backend and converts them into a structured array of DataGroup objects.
 *
 * This function takes raw data group resources, extracts and sorts their fields, and constructs properly typed
 * DataGroup objects with all relevant properties including layout, alignment, and parent relationship information.
 *
 * @param rawDataGroups - Raw data groups from the backend API response. Should be an array of data group resources.
 *                        If not an array, an empty array will be returned.
 * @returns An array of processed DataGroup objects with sorted fields and complete metadata. Returns an empty array
 *          if the input is not an array or if processing encounters data groups without embedded fields.
 *
 * @remarks
 * - Fields are automatically sorted by their `order` property
 * - Data groups without `_embedded` fields are skipped
 * - Parent task and case information is conditionally included based on the presence of `parentTaskId` and `parentCaseId`
 * - Requires `this._fieldConverter` to be available in the calling context for field conversion
 */
export function handleDataGroups(rawDataGroups: unknown, fieldConverter: FieldConverterService): Array<DataGroup> {
    if (!Array.isArray(rawDataGroups)) {
        return [];
    }
    const result: Array<DataGroup> = [];
    rawDataGroups.forEach(dataGroupResource => {
        const dataFields: Array<DataField<any>> = [];
        if (!dataGroupResource.fields?._embedded) {
            return; // continue
        }
        const fields = [];
        Object.keys(dataGroupResource.fields._embedded).forEach(localizedFields => {
            fields.push(...dataGroupResource.fields._embedded[localizedFields]);
        });
        fields.sort((a, b) => a.order - b.order);
        dataFields.push(...fields.map(dataFieldResource => fieldConverter.toClass(dataFieldResource)));
        const dataGroupObject: DataGroup = {
            fields: dataFields,
            stretch: dataGroupResource.stretch,
            title: dataGroupResource.title,
            layout: dataGroupResource.layout,
            alignment: dataGroupResource.alignment,
        };
        if (dataGroupResource.parentTaskId !== undefined) {
            dataGroupObject.parentTaskId = dataGroupResource.parentTaskId;
            dataGroupObject.parentTransitionId = dataGroupResource.parentTransitionId;
            dataGroupObject.parentTaskRefId = dataGroupResource.parentTaskRefId;
            dataGroupObject.nestingLevel = dataGroupResource.nestingLevel;
        }
        if (dataGroupResource.parentCaseId !== undefined) {
            dataGroupObject['parentCaseId'] = dataGroupResource.parentCaseId;
        }
        result.push(dataGroupObject);
    });
    return result;
}
