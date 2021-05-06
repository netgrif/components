import {EventOutcome} from '../../interface/event-outcome';
import {ChangedFieldContainer} from '../../interface/changed-field-container';

export interface SetDataEventOutcome extends EventOutcome {

    data: ChangedFieldContainer;
}
