import {PetriNetReference} from './petri-net-reference';

/**
 * Object from Backend
 */
export interface PetriNet {
    /**
     * Array [PetriNetReference]{@link PetriNetReference}
     */
    petriNetReferences: Array<PetriNetReference>;
}
