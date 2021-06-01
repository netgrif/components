import {EventOutcome} from '../../interface/event-outcome';
import {DataField} from '../../../data-fields/models/abstract-data-field';

export interface GetDataEventOutcome extends EventOutcome {

    data: DataField<any>[];
}
