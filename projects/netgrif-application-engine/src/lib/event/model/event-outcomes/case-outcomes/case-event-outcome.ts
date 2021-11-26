import {PetriNetEventOutcome} from '../petrinet-outcomes/petri-net-event-outcome';
import {Case} from '../../../../resources/interface/case';

export interface CaseEventOutcome extends PetriNetEventOutcome {

    aCase: Case;
}
