import {DataField, Layout} from '../../models/abstract-data-field';
import {UserValue} from './user-value';
import {Behavior} from '../../models/behavior';

export class UserField extends DataField<UserValue> {
    constructor(stringId: string, title: string, behavior: Behavior, value: UserValue, private _roles: Array<string>,
                placeholder?: string, description?: string, layout?: Layout) {
        super(stringId, title, value, behavior, placeholder, description, layout);
    }

    get roles(): Array<string> {
        return this._roles;
    }

    protected valueEquality(a: UserValue, b: UserValue): boolean {
        return (!a && !b) || (!!a && !!b && a.email === b.email);
    }
}
