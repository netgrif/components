import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ActorService {

    // todo 2058

    // public hasRole(role: ProcessRole): boolean {
    //     const user = this._identity.getSelfOrImpersonated();
    //     if (!role || !user.roles) {
    //         return false;
    //     }
    //     return user.roles.some(r => r === role);
    // }
    //
    // /**
    //  * Checks whether the user has role with a specific stringId
    //  * @param roleStringId ID of the role we want to check
    //  */
    // public hasRoleById(roleStringId: string): boolean {
    //     const user = this._identity.getSelfOrImpersonated();
    //     if (!roleStringId || !user.roles) {
    //         return false;
    //     }
    //     return user.roles.some(r => r.stringId === roleStringId);
    // }
    //
    // /**
    //  * Checks whether the user has role with the specified identifier in a process with the specified identifier (any version)
    //  * @param roleIdentifier identifier (import ID) of the role we want to check
    //  * @param netIdentifier identifier (import ID) of the process the role is defined in
    //  */
    // public hasRoleByIdentifier(roleIdentifier: string, netIdentifier: string): boolean {
    //     const user = this._identity.getSelfOrImpersonated();
    //     if (!roleIdentifier || !netIdentifier || !user.roles) {
    //         return false;
    //     }
    //     return user.roles.some(r => r.netImportId === netIdentifier && r.importId === roleIdentifier);
    // }
    //
    // /**
    //  * Checks whether the user has role with the specified name in a process with the specified identifier (any version)
    //  * @param roleName name of the role we want to check
    //  * @param netIdentifier identifier (import ID) of the process the role is defined in
    //  */
    // public hasRoleByName(roleName: string, netIdentifier: string): boolean {
    //     const user = this._identity.getSelfOrImpersonated();
    //     if (!roleName || !netIdentifier || !user.roles) {
    //         return false;
    //     }
    //     return user.roles.some(r => r.netImportId === netIdentifier && r.name === roleName);
    // }
}
