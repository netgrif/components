import {EventOutcome} from '../../interface/event-outcome';
import {ChangedFieldContainer} from '../../interface/changed-field-container';
import {Task} from '../../interface/task';

export interface TaskEventOutcome extends EventOutcome {

    task?: Task;

    data?: ChangedFieldContainer;

}
