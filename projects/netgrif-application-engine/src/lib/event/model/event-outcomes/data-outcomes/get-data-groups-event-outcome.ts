import {DataGroup} from '../../../../resources/interface/data-groups';
import {TaskEventOutcome} from '../task-outcomes/task-event-outcome';

export interface GetDataGroupsEventOutcome extends TaskEventOutcome {

    data: DataGroup[];
}
