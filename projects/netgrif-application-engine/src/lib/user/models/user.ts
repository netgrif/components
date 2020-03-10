import Role from "./role";

export class User {
    // id: string;
    // email: string;
    // firstName: string;
    // lastName: string;
    // authorities: String[];
    // roles: Role[];
    // groups: String[];
    // preferences?: any;

    constructor(public id: string, public email: string, public firstName: string, public lastName: string,
                public groups: String[], public authorities: String[], public preferences: String[], public roles: Role[]) {

    }

    get fullname() {
        return this.firstName + ' ' + this.lastName;
    }
}
