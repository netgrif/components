import {ChangedFieldContainer} from '../../../../resources/interface/changed-field-container';
import {TaskEventOutcome} from '../task-outcomes/task-event-outcome';
import {DataSet} from "../../../../resources/interface/task-data-sets";

export interface SetDataEventOutcome extends TaskEventOutcome {

    changedFields: DataSet;
}
