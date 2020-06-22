import Role from './role';
import {IUser} from './iuser';

export class User implements IUser {
    constructor(
        public id: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public authorities: Array<string>,
        public roles: Array<Role>,
        public groups?: Array<string>) {
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    public get name(): string {
        return this.firstName;
    }

    public get surname(): string {
        return this.lastName;
    }
}
