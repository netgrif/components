import {Link} from './link';

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
