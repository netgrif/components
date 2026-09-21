import {Injectable} from '@angular/core';
import {UserComparatorService} from '../../user/services/user-comparator.service';
import {AssignPolicy} from '../../task-content/model/policy';
import {Task} from '../../resources/interface/task';
import {UserService} from '../../user/services/user.service';
import {Case} from '../../resources/interface/case';
import {PetriNetReferenceWithPermissions} from '../../process/petri-net-reference-with-permissions';
import {Permissions, PermissionType, UserPermissions} from '../../process/permissions';
import {User} from "../../user/models/user";

@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    constructor(protected userComparator: UserComparatorService, protected _userService: UserService) {
    }

    public hasTaskPermission(task: Task | undefined, permission: string): boolean {
        if (!task) {
            return false;
        }

        const rolePermValue = this.checkRolePerms(task.roles, permission);
        const userPermValue = this.checkUserPerms(task.users, permission);
        return this.resolvePermissions(rolePermValue, userPermValue);
    }

    public hasCasePermission(case_: Case | undefined, permission: string): boolean {
        if (!case_) {
            return false;
        }

        const rolePermValue = this.checkRolePerms(case_.permissions, permission);
        const userPermValue = this.checkUserPerms(case_.actors, permission);
        return this.resolvePermissions(rolePermValue, userPermValue);
    }

    public resolvePermissions(rolePermValue: boolean | undefined, userPermValue: boolean | undefined): boolean {
        return userPermValue === undefined ? (!!rolePermValue) : userPermValue;
    }

    public hasNetPermission(action: string, net: PetriNetReferenceWithPermissions): boolean {
        if (!net
            || !net.permissions
            || !action
            || !(net.permissions instanceof Object)
        ) {
            return false;
        }
        if (Object.keys(net.permissions).some(role =>
            this._userService.hasRoleById(role) ? net.permissions[role][action] === false : false)) {
            return false;
        }
        return Object.keys(net.permissions).some(role =>
            this._userService.hasRoleById(role) ? !!net.permissions[role][action] : false
        );
    }

    public canAssign(task: Task | undefined): boolean {
        return !!task
            && (
                (
                    task.assignPolicy === AssignPolicy.manual
                    && !task.assignee
                    && this.hasTaskPermission(task, PermissionType.ASSIGN)
                )
            );
    }

    public canCancel(task: Task | undefined): boolean {
        return !!task && !!task.assignee
            && this.hasTaskPermission(task, PermissionType.CANCEL)
            && ((task.assignedUserPolicy === undefined || task.assignedUserPolicy.cancel === undefined)
                || task.assignedUserPolicy.cancel);
    }

    public canReassign(task: Task | undefined): boolean {
        return !!task && !!task.assignee && this.userComparator.compareUsers(task.assignee.id)
            && this.hasTaskPermission(task, PermissionType.DELEGATE)
            && ((task.assignedUserPolicy === undefined || task.assignedUserPolicy.reassign === undefined)
                || task.assignedUserPolicy.reassign);
    }

    public canFinish(task: Task | undefined): boolean {
        return !!task
            && !!task.assignee
            && this.userComparator.compareUsers(task.assignee.id)
            && this.hasTaskPermission(task, PermissionType.FINISH);
    }

    public canCollapse(task: Task | undefined): boolean {
        return !!task
            && task.assignPolicy === AssignPolicy.manual;
    }

    public checkRolePerms(roles: Permissions, permission: string): boolean | undefined {
        let rolePermValue: boolean;
        if (!!roles) {
            Object.keys(roles).forEach(role => {
                if (roles[role][permission] !== undefined && this._userService.hasRoleById(role)) {
                    rolePermValue = rolePermValue === undefined ? roles[role][permission] : rolePermValue && roles[role][permission];
                }
            });
        }
        return rolePermValue;
    }

    public checkUserPerms(users: UserPermissions, permission): boolean | undefined {
        let userPermValue: boolean;
        if (!!users) {
            const loggedUser: User = this._userService.user.getSelfOrImpersonated();
            const processedActorIds: Array<string> = [];
            Object.keys(users).forEach(actorId => {
                if (userPermValue === false || processedActorIds.includes(actorId)
                    || actorId !== loggedUser.id && !loggedUser.nextGroups?.includes(actorId)) {
                    return;
                }
                let currentUserPermission: boolean = this.getPermissionByUserOrGroup(users, permission, loggedUser);
                if (currentUserPermission !== undefined) {
                    userPermValue = userPermValue === undefined ? currentUserPermission : userPermValue && currentUserPermission;
                }
                loggedUser.nextGroups !== undefined ? processedActorIds.push(actorId, ...loggedUser.nextGroups) : processedActorIds.push(actorId);
            });
        }
        return userPermValue;
    }

    protected getPermissionByUserOrGroup(permissions: UserPermissions, permission, loggedUser: User): boolean | undefined {
        let userPermValue: boolean;
        if (permissions[loggedUser.id] !== undefined) {
            userPermValue = permissions[loggedUser.id][permission];
        }
        if (loggedUser.nextGroups === undefined || loggedUser.nextGroups.length === 0 || userPermValue === false) {
            return userPermValue;
        }
        loggedUser.nextGroups.forEach(function(groupId) {
            if (permissions[groupId] !== undefined && permissions[groupId][permission] !== undefined) {
                userPermValue = userPermValue === undefined ?
                    permissions[groupId][permission] : userPermValue && permissions[groupId][permission];
            }
        })
        return userPermValue;
    }
}
