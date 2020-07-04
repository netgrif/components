import {DataField} from '../../models/abstract-data-field';
import {UserValue} from './user-value';
import {Behavior} from '../../models/behavior';
import {Layout} from '../../models/layout';
import {Role} from '../../../user/models/role';

export class UserField extends DataField<UserValue> {
    constructor(stringId: string, title: string, behavior: Behavior, value: UserValue, private _roles: Array<Role>,
                placeholder?: string, description?: string, layout?: Layout) {
        super(stringId, title, value, behavior, placeholder, description, layout);
    }

    get roles(): Array<Role> {
        return this._roles;
    }

    protected valueEquality(a: UserValue, b: UserValue): boolean {
        return (!a && !b) || (!!a && !!b && a.email === b.email);
    }
}
