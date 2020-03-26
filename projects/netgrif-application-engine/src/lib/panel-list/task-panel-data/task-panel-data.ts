import {TaskPanelDefinition} from '../../panel/task-panel/task-panel-definition';
import {Task} from '../../resources/interface/task';
import {Subject} from 'rxjs';
import {ChangedFields} from '../../data-fields/models/changed-fields';

export interface TaskPanelData {
    header: TaskPanelDefinition;
    task: Task;
    changedFields: Subject<ChangedFields>;
}
