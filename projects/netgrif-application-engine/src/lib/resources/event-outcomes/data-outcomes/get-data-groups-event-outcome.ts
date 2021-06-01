import {EventOutcome} from '../../interface/event-outcome';
import {DataGroup} from '../../interface/data-groups';

export interface GetDataGroupsEventOutcome extends EventOutcome {

    data: DataGroup[];
}
