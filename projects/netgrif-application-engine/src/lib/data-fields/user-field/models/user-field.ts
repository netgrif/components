import {DataField} from '../../models/abstract-data-field';
import {UserValue} from './user-value';
import {Behavior} from '../../models/behavior';

export class UserField extends DataField<UserValue> {
    constructor(stringId: string, title: string, behavior: Behavior, value: UserValue, private _roles: Array<string>,
                placeholder?: string, description?: string) {
        super(stringId, title, behavior, placeholder, description, value);
    }

    get roles(): Array<string> {
        return this._roles;
    }
}
