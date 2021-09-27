import {DataGroup} from '../../resources/interface/data-groups';
import {TaskRefField} from '../../data-fields/task-ref-field/model/task-ref-field';

export interface SplitDataGroup {
    startGroup?: DataGroup;
    taskRef: TaskRefField;
    endGroup?: DataGroup;
}
