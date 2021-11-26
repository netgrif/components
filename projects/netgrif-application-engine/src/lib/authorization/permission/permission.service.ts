import {Injectable} from '@angular/core';
import {UserComparatorService} from '../../user/services/user-comparator.service';
import {AssignPolicy} from '../../task-content/model/policy';
import {Task} from '../../resources/interface/task';
import {UserService} from '../../user/services/user.service';
import {Case} from '../../resources/interface/case';
import {PetriNetReferenceWithPermissions} from '../../process/petri-net-reference-with-permissions';

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

        let rolePermValue: boolean;
        if (!!task.roles) {
            Object.keys(task.roles).forEach(role => {
             if (this._userService.hasRoleById(role) && task.roles[role][permission] !== undefined) {
                 rolePermValue = rolePermValue === undefined ? task.roles[role][permission] : rolePermValue && task.roles[role][permission];
             }
            });
        }

        let userPermValue: boolean;
        if (!!task.users) {
            const loggedUserId = this._userService.user.id;
            Object.keys(task.users).forEach(user => {
                if (user === loggedUserId && task.users[user][permission] !== undefined) {
                    userPermValue = userPermValue === undefined ?
                        rolePermValue || task.users[user][permission] : userPermValue && task.users[user][permission];
                }
            });
        }

        return userPermValue === undefined ? (rolePermValue === undefined ? false : rolePermValue) : userPermValue;
    }

    public hasCasePermission(case_: Case | undefined, permission: string): boolean {
        if (!case_) {
            return false;
        }

        let rolePermValue: boolean;
        if (!!case_.permissions) {
            Object.keys(case_.permissions).forEach(role => {
                if (this._userService.hasRoleById(role) && case_.permissions[role][permission] !== undefined) {
                    rolePermValue = rolePermValue === undefined ?
                        case_.permissions[role][permission] : rolePermValue && case_.permissions[role][permission];
                }
            });
        }

        let userPermValue: boolean;
        if (!!case_.users) {
            const loggedUserId = this._userService.user.id;
            Object.keys(case_.users).forEach(user => {
                if (user === loggedUserId && case_.users[user][permission] !== undefined) {
                    userPermValue = userPermValue === undefined ?
                        rolePermValue || case_.users[user][permission] : userPermValue && case_.users[user][permission];
                }
            });
        }

        return userPermValue === undefined ? (rolePermValue === undefined ? false : rolePermValue) : userPermValue;
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
        if (!Object.keys(net.permissions).filter(role => Object.keys(net.permissions[role])
            .some(perm => perm === action)).some(role =>
            !!net.permissions[role][action])) {
            return true;
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
                    && !task.user
                    && this.hasTaskPermission(task, 'assign')
                )
            );
    }

    public canCancel(task: Task | undefined): boolean {
        return !!task
            && (
                (
                    !!task.user
                    && this.userComparator.compareUsers(task.user)
                    && ((task.assignedUserPolicy === undefined || task.assignedUserPolicy.cancel === undefined)
                        || task.assignedUserPolicy.cancel)
                ) || (
                    !!task.user
                    && this.hasTaskPermission(task, 'cancel')
                )
            );
    }

    public canReassign(task: Task | undefined): boolean {
        return !!task
            && !!task.user
            && this.userComparator.compareUsers(task.user)
            && this.hasTaskPermission(task, 'delegate')
            && ((task.assignedUserPolicy === undefined || task.assignedUserPolicy.reassign === undefined)
                || task.assignedUserPolicy.reassign);
    }

    public canFinish(task: Task | undefined): boolean {
        return !!task
            && !!task.user
            && this.userComparator.compareUsers(task.user)
            && this.hasTaskPermission(task, 'finish');
    }

    public canCollapse(task: Task | undefined): boolean {
        return !!task
            && task.assignPolicy === AssignPolicy.manual;
    }
}
