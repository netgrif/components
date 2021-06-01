import {EventOutcome} from '../../interface/event-outcome';
import {LocalisedFields} from '../../interface/fields';

export interface GetDataLocalisedEventOutcome extends EventOutcome {

    data: LocalisedFields[];

}
