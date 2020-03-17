import {DataField} from '../../models/abstract-data-field';
import {User} from './user';
import {Behavior} from '../../models/behavior';

export class UserField extends DataField<User> {
    constructor(stringId: string, title: string, behavior: Behavior, value: User, private _roles: Array<User>,
                placeholder?: string, description?: string, ) {
        super(stringId, title, behavior, placeholder, description, value);
    }

    get roles(): Array<User> {
        return this._roles;
    }
}
