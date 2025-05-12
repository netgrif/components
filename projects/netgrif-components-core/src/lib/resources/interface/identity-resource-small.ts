import {IIdentity} from '../../identity/models/iidentity';

/**
 * todo doc
 * A "small" version of the {@link IdentityResource} interface, that represents
 * User response in its compacted form without some of the attributes.
 *
 * This interface exists mostly to not give developers false hopes about contents of some backend responses.
 */
export interface IdentityResourceSmall extends IIdentity {
    fullName: string;
    avatar?: string;
}
