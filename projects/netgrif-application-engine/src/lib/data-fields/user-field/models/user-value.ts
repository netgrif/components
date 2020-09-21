/**
 * Used by [UserField]{@link UserField} and [UserAssignComponent]{@link AbstractUserAssignComponent}.
 *
 * Represents the value of the user.
 */
export class UserValue {
    /**
     * An object that represents the selected user in {@link UserField} and [UserAssignComponent]{@link AbstractUserAssignComponent}.
     * @param _id the id of the selected user
     * @param _name the first name of the selected user
     * @param _surname the surname of the selected user
     * @param _email email of the selected user
     */
    constructor(private _id: string, private _name: string, private _surname: string, private _email: string) {
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get surname(): string {
        return this._surname;
    }

    get fullName(): string {
        return this._name + ' ' + this._surname;
    }

    get email(): string {
        return this._email;
    }
}
