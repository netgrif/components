import {DataField} from '../../../data-fields/models/abstract-data-field';
import {DataGroup} from '../../../resources/interface/data-groups';

/**
 * Creates a mock {@link DataGroup} object instance containing the provided fields and having the provided configuration.
 * @param fields the {@link DataField}s contained in the data group
 * @param title the optional title of the data group
 * @param parentTaskId the ID of the parent task (if the data group is task-reffed)
 * @param parentTaskRefId the ID of the parent task ref (if the data group is task-reffed)
 * @param nestingLevel the nesting level of the data group (if the data group is task-reffed)
 */
export function createMockDataGroup(fields: Array<DataField<unknown>>,
                                    title?: string,
                                    parentTaskId?: string,
                                    parentTaskRefId?: string,
                                    nestingLevel?: number): DataGroup {
    return {
        fields,
        title,
        parentTaskId,
        parentTaskRefId,
        nestingLevel,
    };
}
