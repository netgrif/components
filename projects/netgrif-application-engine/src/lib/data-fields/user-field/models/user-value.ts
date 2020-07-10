/**
 * Used by [UserField]{@link UserField} and [UserAssignComponent]{@link UserAssignComponent}.
 *
 * Represents the value of the user.
 */
export class UserValue {
    /**
     * An attribute that distinguishes which user in the user field is selected.
     */
    private _selected: boolean;

    /**
     * Create UserValue.
     * @param _id User id : '5'
     * @param _name User name : 'Admin'
     * @param _surname User surname : 'Netgrif'
     * @param _email User email : 'super@netgrif.com'
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

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
    }
}
