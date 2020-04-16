import {Link} from './link';

/**
 * Object response message
 *
 * Answer error or success
 */
export interface MessageResource {
    error?: string;
    links?: Link;
    success?: string;
}
