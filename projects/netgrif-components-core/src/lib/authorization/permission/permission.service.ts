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

    public hasTaskPermission(task: Task | undefined, permissionType: PermissionType): boolean {
        if (!task) {
            return false;
        }
        if (this._actorService.isAdmin) {
            return true;
        }

        const processRolePermissionValue = this.checkRolePerms(task.processRolePermissions, permissionType);
        const caseRolePermissionValue = this.checkRolePerms(task.caseRolePermissions, permissionType);
        return this.resolvePermissions(processRolePermissionValue, caseRolePermissionValue);
    }

    public hasCasePermission(case_: Case | undefined, permissionType: PermissionType): boolean {
        if (!case_) {
            return false;
        }
        if (this._actorService.isAdmin) {
            return true;
        }

        const processRolePermissionValue = this.checkRolePerms(case_.processRolePermissions, permissionType);
        const caseRolePermissionValue = this.checkRolePerms(case_.caseRolePermissions, permissionType);
        return this.resolvePermissions(processRolePermissionValue, caseRolePermissionValue);
    }

    public resolvePermissions(processRolePermissionValue: boolean | undefined, caseRolePermissionValue: boolean | undefined): boolean {
        return caseRolePermissionValue === undefined ? (!!processRolePermissionValue) : caseRolePermissionValue;
    }

    public hasNetPermission(permissionType: PermissionType, net: PetriNetReference): boolean {
        if (!net
            || !net.processRolePermissions
            || !permissionType
            || !(net.processRolePermissions instanceof Object)
        ) {
            return false;
        }
        const processRolePermissionValue = this.checkRolePerms(net.processRolePermissions, permissionType);
        return this.resolvePermissions(processRolePermissionValue, undefined);
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

    public checkRolePerms(permissions: Permissions, permissionType: PermissionType): boolean | undefined {
        let permissionValue: boolean;
        if (!!permissions) {
            Object.keys(permissions).forEach(roleId => {
                if (permissions[roleId][permissionType] !== undefined && this._actorService.hasRole(roleId)) {
                    permissionValue = permissionValue === undefined ? permissions[roleId][permissionType] : permissionValue && permissions[roleId][permissionType];
                }
            });
        }
        return permissionValue;
    }
}
