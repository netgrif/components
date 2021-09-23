import {ProcessRole} from '../../resources/interface/process-role';
import {IUser} from './iuser';

/**
 * The user object that is used by the frontend in its logic.
 */
export class User implements IUser {

    constructor(
        public id: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public authorities: Array<string>,
        public roles: Array<ProcessRole>,
        public groups?: Array<string>,
        public nextGroups?: Array<string>,
        public avatar?: string,
        public banner?: string,
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
}
