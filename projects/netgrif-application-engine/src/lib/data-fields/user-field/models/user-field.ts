import {AbstractDataField} from '../../models/abstract-data-field';
import {UserValue} from './user-value';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';

export class UserField extends AbstractDataField<UserValue> {
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
