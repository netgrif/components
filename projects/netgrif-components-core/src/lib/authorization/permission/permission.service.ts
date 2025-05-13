import {Injectable} from '@angular/core';
import {ActorComparatorService} from '../../actor/services/actor-comparator.service';
import {AssignPolicy} from '../../task-content/model/policy';
import {Task} from '../../resources/interface/task';
import {Case} from '../../resources/interface/case';
import {Permissions, PermissionType} from '../../process/permissions';
import {PetriNetReference} from "../../resources/interface/petri-net-reference";
import {ActorService} from "../../actor/services/actor.service";

@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    constructor(protected userComparator: ActorComparatorService, protected _actorService: ActorService) {
    }

    public hasTaskPermission(task: Task | undefined, permission: PermissionType): boolean {
        return true;
        // if (!task) {
        //     return false;
        // }
        //
        // const rolePermValue = this.checkRolePerms(task.roles, permission);
        // const userPermValue = this.checkUserPerms(task.users, permission);
        // return this.resolvePermissions(rolePermValue, userPermValue);
    }

    public hasCasePermission(case_: Case | undefined, permission: PermissionType): boolean {
        if (!case_) {
            return false;
        }

        // const rolePermValue = this.checkRolePerms(case_.permissions, permission);
        // const userPermValue = this.checkUserPerms(case_.users, permission);
        // return this.resolvePermissions(rolePermValue, userPermValue);
    }

    public resolvePermissions(rolePermValue: boolean | undefined, userPermValue: boolean | undefined): boolean {
        return userPermValue === undefined ? (!!rolePermValue) : userPermValue;
    }

    public hasNetPermission(action: PermissionType, net: PetriNetReference): boolean {
        return true;
        // if (!net
        //     || !net.permissions
        //     || !action
        //     || !(net.permissions instanceof Object)
        // ) {
        //     return false;
        // }
        // if (Object.keys(net.permissions).some(role =>
        //     this._userService.hasRoleById(role) ? net.permissions[role][action] === false : false)) {
        //     return false;
        // }
        // return Object.keys(net.permissions).some(role =>
        //     this._userService.hasRoleById(role) ? !!net.permissions[role][action] : false
        // );
    }

    public canAssign(task: Task | undefined): boolean {
        return !!task
            && (
                (
                    task.assignPolicy === AssignPolicy.manual
                    && !task.assigneeId
                    && this.hasTaskPermission(task, PermissionType.ASSIGN)
                )
            );
    }

    public canCancel(task: Task | undefined): boolean {
        return !!task && !!task.assigneeId
            && this.hasTaskPermission(task, PermissionType.CANCEL)
            && ((task.assignedUserPolicy === undefined || task.assignedUserPolicy.cancel === undefined)
                || task.assignedUserPolicy.cancel);
    }

    public canReassign(task: Task | undefined): boolean {
        return !!task && !!task.assigneeId && this.userComparator.compareActors(task.assigneeId)
            && this.hasTaskPermission(task, PermissionType.DELEGATE)
            && ((task.assignedUserPolicy === undefined || task.assignedUserPolicy.reassign === undefined)
                || task.assignedUserPolicy.reassign);
    }

    public canFinish(task: Task | undefined): boolean {
        return !!task
            && !!task.assigneeId
            && this.userComparator.compareActors(task.assigneeId)
            && this.hasTaskPermission(task, PermissionType.FINISH);
    }

    public canCollapse(task: Task | undefined): boolean {
        return !!task
            && task.assignPolicy === AssignPolicy.manual;
    }

    public checkRolePerms(roles: Permissions, permission: PermissionType): boolean | undefined {
        let rolePermValue: boolean;
        if (!!roles) {
            // Object.keys(roles).forEach(role => {
            //     if (roles[role][permission] !== undefined && this._actorService.hasRoleById(role)) {
            //         rolePermValue = rolePermValue === undefined ? roles[role][permission] : rolePermValue && roles[role][permission];
            //     }
            // });
        }
        return rolePermValue;
    }

    public checkUserPerms(users: object, permission: PermissionType): boolean | undefined {
        let userPermValue: boolean;
        if (!!users) {
            // const loggedUserId = this._actorService.identity.getSelfOrImpersonated().id;
            // Object.keys(users).forEach(user => {
            //     if (user === loggedUserId && users[user][permission] !== undefined) {
            //         userPermValue = userPermValue === undefined ?
            //             users[user][permission] : userPermValue && users[user][permission];
            //     }
            // });
        }
        return userPermValue;
    }
}
