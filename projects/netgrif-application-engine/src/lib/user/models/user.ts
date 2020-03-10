import Role from "./role";
import {Preferences} from './preferences/preferences';

export class User {
    stringId: string;
    email: string;
    firstName: string;
    lastName: string;
    authorities: String[];
    roles: Role[];
    groups: String[];
    preferences: Preferences;

    get fullname() {
        return this.firstName + ' ' + this.lastName;
    }
}
