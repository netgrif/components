import {Authority, ProcessRole, User as AuthUser, UserProcessRole} from './user';
import {User} from '../../user/models/user';
import Role from '../../user/models/role';
import {Transformer} from './transformer';

export class UserTransformer implements Transformer<AuthUser, User> {

    private transformAuthorities(authorities: Array<Authority>): Array<string> {
        return !authorities ? [] : authorities.map(a => a.authority);
    }

    private transformProcessRoles(roles: Array<ProcessRole>): Array<Role> {
        return !roles ? [] : roles.map(r => ({
            id: r.stringId,
            name: r.name,
            description: r.description
        }));
    }

    private transformUserProcessRoles(roles: Array<UserProcessRole>): Array<Role> {
        return !roles ? [] : roles.map(r => ({
            id: r.roleId,
            net: r.netId,
            name: 'some role'
        }));
    }

    private mergeRoles(roles: Array<Array<Role>>): Array<Role> {
        const result = roles[0];

        roles.splice(0, 1);
        roles.forEach(roleArray => {
            roleArray.forEach(mergableRole => {
                const roleIndex = result.findIndex(r => r.id === mergableRole.id);
                if (roleIndex === -1) {
                    return;
                }
                result[roleIndex].net = mergableRole.net ? mergableRole.net : result[roleIndex].net;
                result[roleIndex].description = mergableRole.description ? mergableRole.description : result[roleIndex].description;
                result[roleIndex].name = mergableRole.name ? mergableRole.name : result[roleIndex].name;
            });
        });

        return result;
    }

    public transform(user: AuthUser): User {
        const groups: Array<string> = []; // TODO groups parsing

        return new User(
            user.id,
            user.email,
            user.name,
            user.surname,
            this.transformAuthorities(user.authorities),
            this.mergeRoles([
                this.transformProcessRoles(user.processRoles),
                this.transformUserProcessRoles(user.userProcessRoles)]),
            groups);

    }

}
