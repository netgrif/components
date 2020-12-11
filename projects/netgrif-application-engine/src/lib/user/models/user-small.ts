import {IUser} from './iuser';

/**
 * A "small" version of the User interface, that represents User in its compacted form without some of the attributes.
 *
 * This interface exists mostly to not give developers false hopes about contents of some backend responses.
 */
export interface UserSmall extends IUser {
    fullName: string;
    avatar?: string;
}
