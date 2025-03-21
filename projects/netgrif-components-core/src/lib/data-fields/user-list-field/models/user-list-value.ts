/**
 * Used by [UserListField]{@link UserListField}.
 *
 * Represents the value of the user list.
 */
import { UserValue } from '../../user-field/models/user-value';

export class UserListValue {

    private _userValues: Map<string, UserValue>;

    constructor(userValues: Map<string, UserValue>) {
        this._userValues = userValues;
    }

    get userValues(): Map<string, UserValue> {
        return this._userValues;
    }

    set userValues(value: Map<string, UserValue>) {
        this._userValues = value;
    }

    public addUserValue(value: UserValue): void {
        this._userValues.set(value.id, value);
    }

    public addUserValues(value: Map<string, UserValue>): void {
        value.forEach((v, k) => this._userValues.set(k, v))
    }

    public getLast(): UserValue {
        if (this._userValues.size == 0) {
            return new UserValue('', '', '', '');
        }
        return Array.from(this._userValues.values()).pop();
    }

    public toString(): string {
        const userNames = Array.from(this._userValues.values()).reduce((acc, curr) => acc + curr.fullName + ',', '')
        return userNames.slice(0, userNames.lastIndexOf(','))
    }

    public removeUserValue(userId: string): void {
        this._userValues.delete(userId);
    }


}
