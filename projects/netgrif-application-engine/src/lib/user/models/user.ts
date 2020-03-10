import Role from "./role";

export class User {
    stringId: string;
    email: string;
    firstName: string;
    lastName: string;
    authorities: String[];
    roles: Role[];
    groups: String[];
    preferences?: any;

    get fullname() {
        return this.firstName + ' ' + this.lastName;
    }
}
