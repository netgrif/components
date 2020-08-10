import {Link} from './link';
import {PetriNetReference} from './petri-net-reference';

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
