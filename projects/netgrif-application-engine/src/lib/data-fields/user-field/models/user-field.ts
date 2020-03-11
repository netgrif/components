import {DataField} from "../../models/abstract-data-field";
import {User} from "../../../side-menu/user-assign/user";
import {Behaviour} from '../../models/behaviour';

export class UserField extends DataField<User>{
    constructor(title: string, placeholder: string, value: User, behaviour: Behaviour, private _roles: Array<User>) {
        super(title, placeholder, value, behaviour);
    }

    get roles(): Array<User> {
        return this._roles;
    }
}
