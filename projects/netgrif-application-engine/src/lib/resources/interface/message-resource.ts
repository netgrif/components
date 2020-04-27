import {Link} from './link';

export interface MessageResource {
    error?: string;
    links?: Link;
    success?: string;
}
