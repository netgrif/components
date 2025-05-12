import {ProcessRole} from '../../resources/interface/process-role';
import {IIdentity} from './iidentity';

/**
 * The user object that is used by the frontend in its logic.
 */
export class Identity implements IIdentity {

    constructor(
        public id: string,
        public username: string,
        public firstName: string,
        public lastName: string,
        public activeActorId: string,
        public impersonated?: Identity
    ) {
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    /**
     * Synonym for `firstName`.
     */
    public get firstname(): string {
        return this.firstName;
    }

    /**
     * Synonym for `lastName`.
     */
    public get lastname(): string {
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
    public getSelfOrImpersonated(): Identity {
        return this.isImpersonating() ? this.impersonated : this;
    }

    /**
     * @returns true if user is impersonating another user
     */
    public isImpersonating(): boolean {
        return !!this.impersonated;
    }
}
