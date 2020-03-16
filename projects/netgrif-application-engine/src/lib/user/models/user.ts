import Role from './role';
import {Preferences} from './preferences/preferences';

export class User {
    constructor(
        public id: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public authorities: Array<string>,
        public roles: Array<Role>,
        public groups?: Array<string>,
        public preferences?: Preferences) {
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
