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
        if (!task
            || (!task.roles && !task.users)
            || !permission
            || (!(task.roles instanceof Object) && !(task.users instanceof Object))
        ) {
            return false;
        }

        const result = Object.keys(task.users).some(user =>
            !!task.users ? !!task.users[user][permission] : false
        );

        return result || Object.keys(task.roles).some(role =>
            this._userService.hasRoleById(role) ? !!task.roles[role][permission] : false
        );
    }

    public hasCasePermission(case_: Case | undefined, permission: string): boolean {
        if (!case_
            || (!case_.permissions && !case_.users)
            || !permission
            || (!(case_.permissions instanceof Object) && !(case_.users instanceof Object))
        ) {
            return false;
        }
        if (Object.keys(case_.permissions).length === 0 && Object.keys(case_.users).length === 0) {
            return true;
        }

        let result = true;

        if (Object.keys(case_.users).length > 0
            && !!case_.users[this._userService.user.id]
            && case_.users[this._userService.user.id][permission] !== undefined) {
            result = case_.users[this._userService.user.id][permission];
        }
        this._userService.user.roles.forEach(role => {
            if (!!case_.permissions[role.stringId]
                && case_.permissions[role.stringId][permission] !== undefined) {
                result = result && !!case_.permissions[role.stringId][permission];
            }
        });
        return result;
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
                || ((
                    task.roles === null
                    || task.roles === undefined
                    || Object.keys(task.roles).length === 0
                ) && (
                    task.users === null
                    || task.users === undefined
                    || Object.keys(task.users).length === 0
                ))
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
