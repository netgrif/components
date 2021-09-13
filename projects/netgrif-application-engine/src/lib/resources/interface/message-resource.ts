import {Link} from './link';
import {PetriNetReference} from './petri-net-reference';
import {EventOutcome} from './event-outcome';
import {ChangedFieldContainer} from './changed-field-container';

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

export interface EventOutcomeMessageResource extends MessageResource {

    outcome?: EventOutcome;
}
