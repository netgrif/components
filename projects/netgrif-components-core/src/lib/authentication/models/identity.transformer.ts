import {Identity} from '../../identity/models/Identity';
import {Transformer} from './transformer';
import {Injectable} from '@angular/core';
import {IdentityResource} from '../../resources/interface/identity-resource';
import {Authority} from '../../resources/interface/authority';

@Injectable({
    providedIn: 'root'
})
export class IdentityTransformer implements Transformer<IdentityResource, Identity> {

    protected transformAuthorities(authorities: Array<Authority>): Array<string> {
        return !authorities ? [] : authorities.map(a => a.authority);
    }

    public transform(identity: IdentityResource): Identity {
        return new Identity(
            identity.id,
            identity.username,
            identity.firstname,
            identity.lastname,
            identity.activeActorId,
            identity.impersonated ? this.transform(identity.impersonated) : undefined);
    }

}
