import {EventOutcome} from '../../../../resources/interface/event-outcome';
import {PetriNetReference} from '../../../../resources/interface/petri-net-reference';

export interface PetriNetEventOutcome extends EventOutcome {

    net: PetriNetReference;
}
