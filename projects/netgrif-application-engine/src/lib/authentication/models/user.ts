export default class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    permissions: {};
    roles: {};
    groups: {};
    preferences?: any;

    get fullname() {
        return this.firstName + ' ' + this.lastName;
    }
}
