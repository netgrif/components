import {PetriNetEventOutcome} from '../../../event/model/event-outcomes/petrinet-outcomes/petri-net-event-outcome';
import {createMockNet} from './create-mock-net';
import {Net} from '../../../process/net';
import {EventOutcome} from '../../../resources/interface/event-outcome';
/**
 * Creates a mock PetriNetEventOutcome with given net and outcomes attributes.
 *
 * If attributes are not specified, default values are used.
 */
export function createMockPetriNetOutcome(net: Net = createMockNet(), outcomes: Array<EventOutcome> = []) {
    return {
        outcomes,
        net,
        message: 'Mock petri net event outcome'
    } as PetriNetEventOutcome;
}
