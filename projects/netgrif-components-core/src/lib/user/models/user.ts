import {ProcessRole} from '../../resources/interface/process-role';
import {IUser} from './iuser';
import {Group} from "../../resources/interface/group";

/**
 * The user object that is used by the frontend in its logic.
 */
export class User implements IUser {

    constructor(
        public id: string,
        public username: string,
        public email: string,
        public realmId: string,
        public firstName: string,
        public lastName: string,
        public authorities: Array<string>,
        public roles: Array<ProcessRole>,
        public groupIds?: Array<string>,
        public groups?: Group[],
        public impersonated?: User
    ) {
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    /**
     * Synonym for `firstName`.
     */
    public get name(): string {
        return this.firstName;
    }

    /**
     * Synonym for `lastName`.
     */
    public get surname(): string {
        return this.lastName;
    }

    /**
     * @returns `true` if the User object represents an empty user, `false` otherwise.
     */
    public isEmpty(): boolean {
        return this.id === '';
    }

    /**
     * @returns self if no impersonated user is present, or impersonated user otherwise
     */
    public getSelfOrImpersonated(): User {
        return this.isImpersonating() ? this.impersonated : this;
    }

    /**
     * @returns true if user is impersonating another user
     */
    public isImpersonating(): boolean {
        return !!this.impersonated;
    }
}
