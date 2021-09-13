import {LocalisedFields} from '../../../../resources/interface/fields';
import {TaskEventOutcome} from '../task-outcomes/task-event-outcome';

export interface GetDataLocalisedEventOutcome extends TaskEventOutcome {

    data: LocalisedFields[];

}
