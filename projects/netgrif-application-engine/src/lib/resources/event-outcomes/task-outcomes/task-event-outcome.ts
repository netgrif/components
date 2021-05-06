import {EventOutcome} from '../../interface/event-outcome';
import {NaeDate} from '../../types/nae-date-type';
import {ChangedFieldContainer} from '../../interface/changed-field-container';
import {Task} from '../../interface/task';
import {UserResourceSmall} from '../../interface/user-resource-small';

export interface TaskEventOutcome extends EventOutcome {

    task: Task;

    data: ChangedFieldContainer;

    /**
     * Information regarding the assignee of the task after the operation was performed.
     *
     * If the value is `undefined` it can either mean, that the task has no assignee, or that the task no longer exists.
     * Reloading the task is recommended in this case.
     */
    assignee?: UserResourceSmall;
    /**
     * The start date of the task.
     */
    startDate?: NaeDate;

    /**
     * The finish date of the task.
     */
    finishDate?: NaeDate;

    caseId: string;

}
