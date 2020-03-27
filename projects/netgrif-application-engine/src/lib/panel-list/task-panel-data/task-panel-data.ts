import {TaskPanelDefinition} from '../../panel/task-panel/task-panel-definition';
import {DataGroup} from '../../resources/interface/data-groups';

export interface TaskPanelData {
    header: TaskPanelDefinition;
    resource?: DataGroup;
}
