import {User} from '../../user/models/user';
import {Transformer} from './transformer';
import {Injectable} from '@angular/core';
import {UserResource} from '../../resources/interface/user-resource';
import {Authority} from '../../resources/interface/authority';

@Injectable({
    providedIn: 'root'
})
export class UserTransformer implements Transformer<UserResource, User> {

    protected transformAuthorities(authorities: Array<Authority>): Array<string> {
        return !authorities ? [] : authorities.map(a => a.authority);
    }

    public transform(user: UserResource): User {
        const groups: Array<string> = []; // TODO groups parsing

        return new User(
            user.id,
            user.email,
            user.name,
            user.surname,
            this.transformAuthorities(user.authorities),
            user.processRoles,
            groups,
            user.nextGroups,
            user.impersonated ? this.transform(user.impersonated) : undefined);

    }

}
