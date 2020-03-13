import {DataField} from '../abstract-data-field';
import {User} from '../../side-menu/user-assign/user';

export class UserField extends DataField<User> {
    constructor(stringId: string, title: string, behavior: any, value: User, private _roles: Array<User>,
                placeholder?: string, description?: string, ) {
        super(stringId, title, behavior, placeholder, description, value);
    }

    get roles(): Array<User> {
        return this._roles;
    }
}
