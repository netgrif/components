import {EventOutcome} from '../../interface/event-outcome';
import {PetriNetReference} from '../../interface/petri-net-reference';

export interface PetriNetEventOutcome extends EventOutcome {

    net: PetriNetReference;
}
