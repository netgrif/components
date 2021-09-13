import {DataField} from '../../../../data-fields/models/abstract-data-field';
import {TaskEventOutcome} from '../task-outcomes/task-event-outcome';

export interface GetDataEventOutcome extends TaskEventOutcome {

    data: DataField<any>[];
}
