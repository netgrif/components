import {Task} from '../../../../resources/interface/task';
import {CaseEventOutcome} from '../case-outcomes/case-event-outcome';

export interface TaskEventOutcome extends CaseEventOutcome {

    task?: Task;

}
