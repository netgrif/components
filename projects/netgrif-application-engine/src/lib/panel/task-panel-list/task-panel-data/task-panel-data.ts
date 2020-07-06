import {Task} from '../../../resources/interface/task';
import {Subject} from 'rxjs';
import {ChangedFields} from '../../../data-fields/models/changed-fields';


export interface TaskPanelData {
    task: Task;
    changedFields: Subject<ChangedFields>;
    initiallyExpanded: boolean;
}
