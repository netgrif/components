import {DataField} from '../../../data-fields/models/abstract-data-field';
import {DataGroup, DataGroupAlignment} from '../../../resources/interface/data-groups';
import {DataGroupCompact, DataGroupHideEmptyRows, DataGroupLayoutType} from '../../../resources/interface/data-group-layout';

/**
 * Creates a mock {@link DataGroup} object instance containing the provided fields and having the provided configuration.
 * @param fields the {@link DataField}s contained in the data group
 * @param title the optional title of the data group
 * @param alignment alignment of the fields in non-full rows within the data group (affects flow and legacy layout)
 * @param layoutType the layout type of the data group
 * @param compact compacting rule for the data group
 * @param hideRows row hiding rule for the data group
 * @param stretch whether the `stretch` property of the data group is enabled or not
 * @param cols the number of columns of the data group layout
 * @param parentTaskId the ID of the parent task (if the data group is task-reffed)
 * @param parentTaskRefId the ID of the parent task ref (if the data group is task-reffed)
 * @param nestingLevel the nesting level of the data group (if the data group is task-reffed)
 */
export function createMockDataGroup(fields: Array<DataField<unknown>>,
                                    title?: string,
                                    alignment = DataGroupAlignment.START,
                                    layoutType = DataGroupLayoutType.LEGACY,
                                    compact?: DataGroupCompact,
                                    hideRows?: DataGroupHideEmptyRows,
                                    stretch = false,
                                    cols = 4,
                                    parentTaskId?: string,
                                    parentTaskRefId?: string,
                                    nestingLevel?: number): DataGroup {
    return {
        fields,
        title,
        alignment,
        stretch,
        layout: {
            type: layoutType,
            rows: 0,
            compactDirection: compact,
            hideEmptyRows: hideRows,
            cols
        },
        parentTaskId,
        parentTaskRefId,
        nestingLevel,
    };
}
