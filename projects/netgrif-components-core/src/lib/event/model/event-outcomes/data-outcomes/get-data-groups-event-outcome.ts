import {DataGroup} from '../../../../resources/interface/data-groups';
import {TaskEventOutcome} from '../task-outcomes/task-event-outcome';
import {DataGroupResource} from "../../../../task-content/model/resource-interfaces";

export interface GetDataGroupsEventOutcome extends TaskEventOutcome {

    data: Array<DataGroupResource>;
}
