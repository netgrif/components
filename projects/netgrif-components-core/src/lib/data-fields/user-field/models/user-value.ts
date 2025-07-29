/**
 * Used by [UserField]{@link UserField} and [UserAssignComponent]{@link AbstractUserAssignComponent}.
 *
 * Represents the value of the user.
 */
export class UserValue {
    /**
     * An object that represents the selected user in {@link UserField} and [UserAssignComponent]{@link AbstractUserAssignComponent}.
     * @param _id the id of the selected user
     * @param _realmId the id of the selected user realm
     * @param _firstName the first name of the selected user
     * @param _lastName the surname of the selected user
     * @param _username email of the selected user
     */
    constructor(private _id: string, private _realmId: string, private _firstName: string, private _lastName: string, private _username: string) {
    }

    get id(): string {
        return this._id;
    }

    get realmId(): string {
        return this._realmId;
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get fullName(): string {
        return this._firstName + ' ' + this._lastName;
    }

    get username(): string {
        return this._username;
    }
}
