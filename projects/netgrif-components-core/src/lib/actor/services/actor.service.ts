import {Injectable} from "@angular/core";
import {take, switchMap} from "rxjs/operators";
import {RbacResourceService} from "../../resources/engine-endpoint/rbac-resource.service";
import {IdentityService} from "../../identity/services/identity.service";

@Injectable({
    providedIn: 'root'
})
export class ActorService {
    protected static readonly adminRoleImportId: string = 'admin';

    protected currentRoleIds: Array<string>;
    protected adminAppRoleId: string;
    protected _isAdmin: boolean;

    constructor(protected _rbacResourceService: RbacResourceService, protected _identityService: IdentityService) {
        this._rbacResourceService.findAppRoleId(ActorService.adminRoleImportId).pipe(take(1))
            .subscribe(role => this.adminAppRoleId = role?.stringId)

        this._identityService.identity$.pipe(
            switchMap(identity => this._rbacResourceService.findRoleIdsByActor(identity.activeActorId).pipe(take(1)))
        ).subscribe(roleIds => {
            this.currentRoleIds = roleIds;
        })
    }

    /**
     * Checks if the current actor has a specific role.
     * @param roleId - The ID of the role to check for.
     * @returns True if the current actor has the specified role, false otherwise.
     */
    public hasRole(roleId: string): boolean {
        if (this.currentRoleIds === undefined || roleId === undefined) {
            return false;
        }
        return this.currentRoleIds.some(r => r === roleId);
    }


    /**
     * Checks if the current actor has an admin app role.
     * @returns True if the current actor has an admin app role, false otherwise.
     */
    get isAdmin(): boolean | undefined {
        if (this._isAdmin === undefined && this.currentRoleIds !== undefined) {
            this._isAdmin = this.currentRoleIds.some(r => r === this.adminAppRoleId)
        }
        return this._isAdmin;
    }
}
