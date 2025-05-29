import {IIdentity} from "../../identity/models/iidentity";

/**
 * todo doc
 * The user object as sent by backend. The frontend transforms this object with the help of {@link UserTransformer}
 * and uses the transformed object to handle all frontend logic.
 */
export interface IdentityResource extends IIdentity {
    telNumber?: string;
    fullName?: string;
    impersonated?: IdentityResource;
    _links?: any;
}
