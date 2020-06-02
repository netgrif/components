import Role from './role';

export class User {
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
}
