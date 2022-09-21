/**
 * Used by [UserListField]{@link UserListField}.
 *
 * Represents the value of the user list.
 */
import { UserValue } from '../../user-field/models/user-value';

export class UserListValue {

    private _userValues: Array<UserValue>;

    constructor(userValues: Array<UserValue>) {
        this._userValues = userValues;
    }

    get userValues(): Array<UserValue> {
        return this._userValues;
    }

    set userValues(value: Array<UserValue>) {
        this._userValues = value;
    }

    public addUserValue(value: UserValue): void {
        this._userValues.push(value);
    }

    public addUserValues(value: UserValue[]): void {
        this._userValues.push(...value);
    }

    public getLast(): UserValue {
        if (this._userValues.length == 0) {
            return new UserValue('', '', '', '');
        }
        return this._userValues[this._userValues.length - 1];
    }

    public removeUserValue(value: UserValue): void {
        const index = this._userValues.findIndex(user => user.id === value.id);
        if (index > -1) {
            this._userValues.splice(index, 1);
        }
    }


}
