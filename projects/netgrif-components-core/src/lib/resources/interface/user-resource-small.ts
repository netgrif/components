import {IUser} from '../../user/models/iuser';

/**
 * A "small" version of the {@link UserResource} interface, that represents
 * User response in its compacted form without some of the attributes.
 *
 * This interface exists mostly to not give developers false hopes about contents of some backend responses.
 */
export interface UserResourceSmall extends IUser {
    fullName: string;
    avatar?: string;
}
