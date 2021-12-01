import {Link} from './link';
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

export interface EventOutcomeMessageResource extends MessageResource {

    outcome?: EventOutcome;
}
