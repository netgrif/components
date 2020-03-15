import {DataField} from "../../models/abstract-data-field";
import {User} from "../../../side-menu/user-assign/user";
import {Behavior} from '../../models/behavior';

export class UserField extends DataField<User>{
    constructor(title: string, placeholder: string, value: User, behaviour: Behavior, private _roles: Array<User>) {
        super(title, placeholder, value, behaviour);
    }

    get roles(): Array<User> {
        return this._roles;
    }
}
