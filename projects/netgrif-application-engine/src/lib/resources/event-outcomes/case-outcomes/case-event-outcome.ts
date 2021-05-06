import {EventOutcome} from '../../interface/event-outcome';
import {Case} from '../../interface/case';

export interface CaseEventOutcome extends EventOutcome {

    case: Case;

}
