import {DataField} from "../abstract-data-field";
import {User} from "../../side-menu/user-assign/user";

export class UserField extends DataField<User>{
    constructor(title: string, placeholder: string, value: User, private _roles: Array<User>) {
        super(title, placeholder, value);
    }

    get roles(): Array<User> {
        return this._roles;
    }
}
