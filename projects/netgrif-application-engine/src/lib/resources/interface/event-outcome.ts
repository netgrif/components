import {MessageResource} from './message-resource';
import {ChangedFieldContainer} from './changed-field-container';
import {UserTask} from './user-task';
import {NaeDate} from '../types/nae-date-type';

export interface EventOutcome extends MessageResource, ChangedFieldContainer {
    /**
     * Information regarding the assignee of the task after the operation was performed.
     *
     * If the value is `undefined` it can either mean, that the task has no assignee, or that the task no longer exists.
     * Reloading the task is recommended in this case.
     */
    assignee?: UserTask;

    /**
     * The start date of the task.
     */
    startDate?: NaeDate;

    /**
     * The finish date of the task.
     */
    finishDate?: NaeDate;
}
