import {ChangedFieldContainer} from '../../../../resources/interface/changed-field-container';
import {TaskEventOutcome} from '../task-outcomes/task-event-outcome';

export interface SetDataEventOutcome extends TaskEventOutcome {

    changedFields: ChangedFieldContainer;
}
