import {Injectable} from "@angular/core";
import {take, switchMap} from "rxjs/operators";
import {RbacResourceService} from "../../resources/engine-endpoint/rbac-resource.service";
import {IdentityService} from "../../identity/services/identity.service";

@Injectable({
    providedIn: 'root'
})
export class ActorService {

    protected currentRoleIds: Set<string>;

    constructor(protected _rbacResourceService: RbacResourceService, protected _identityService: IdentityService) {
        this._identityService.identity$.pipe(
            switchMap(identity => this._rbacResourceService.findRoleIds(identity.activeActorId).pipe(take(1)))
        ).subscribe(roleIds => {
            this.currentRoleIds = roleIds;
        })
    }

    // todo 2058

    /**
     * Checks if the current actor has a specific role.
     * @param roleId - The ID of the role to check for.
     * @returns True if the current actor has the specified role, false otherwise.
     */
    public hasRole(roleId: string): boolean {
        return this.currentRoleIds.has(roleId);
    }
}
