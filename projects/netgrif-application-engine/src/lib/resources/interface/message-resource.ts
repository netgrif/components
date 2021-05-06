import {Link} from './link';
import {PetriNetReference} from './petri-net-reference';
import {EventOutcome} from './event-outcome';

/**
 * Object response message
 *
 * Answer error or success
 */
export interface MessageResource {
    /**
     * Error message
     */
    error?: string;
    /**
     * @ignore
     */
    links?: Link;
    /**
     * Success Message
     */
    success?: string;
}

export interface PetriNetMessageResource {
    /**
     * Error message
     */
    error?: string;
    /**
     * @ignore
     */
    net?: PetriNetReference;
    /**
     * Success Message
     */
    success?: string;
}

export interface EventOutcomeMessageResource extends MessageResource {

    data?: EventOutcome[];

}
