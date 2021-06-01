import {EventOutcome} from '../../interface/event-outcome';
import {Case} from '../../interface/case';

export interface CreateCaseEventOutcome extends EventOutcome {

    acase: Case;

}

