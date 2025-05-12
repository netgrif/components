import {IdentityResourceSmall} from './identity-resource-small';
import {Group} from './group';
import {Authority} from './authority';
import {ProcessRole} from './process-role';

/**
 * todo doc
 * The user object as sent by backend. The frontend transforms this object with the help of {@link UserTransformer}
 * and uses the transformed object to handle all frontend logic.
 */
export interface IdentityResource extends IdentityResourceSmall {
    telNumber?: string;
    impersonated?: IdentityResource;
    _links?: any;
}
