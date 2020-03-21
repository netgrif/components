import {TaskPanelDefinition} from '../../panel/task-panel/task-panel-definition';
import {Resources} from '../../panel/task-panel/task-panel-content/resources';

export interface TaskPanelData {
    header: TaskPanelDefinition;
    resource: Resources;
}
