import {DataField} from '../../models/abstract-data-field';
import {UserValue} from './user-value';
import {Behavior} from '../../models/behavior';

export class UserField extends DataField<UserValue> {
    constructor(stringId: string, title: string, behavior: Behavior, value: UserValue, private _roles: Array<string>,
                placeholder?: string, description?: string) {
        super(stringId, title, value, behavior, placeholder, description);
    }

    get roles(): Array<string> {
        return this._roles;
    }

    protected valueEquality(a: UserValue, b: UserValue): boolean {
        return (a === undefined && b === undefined) || (a !== undefined && b !== undefined && a.email === b.email);
    }
}
