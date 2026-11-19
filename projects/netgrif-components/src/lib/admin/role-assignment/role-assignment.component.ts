import {Component, ChangeDetectionStrategy, ElementRef, inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractRoleAssignmentComponent, ProcessVersion, RoleAssignmentService, UserListItem, UserService, userInitials} from '@netgrif/components-core';
import {DensityItemSize} from '../density-item-size';

/**
 * Assigning process roles to users (Material 3 master / detail): users with a selection on the left,
 * processes with their roles on the right. A change of a role is saved for all selected users immediately.
 */
@Component({
    selector: 'nc-role-assignment',
    templateUrl: './role-assignment.component.html',
    styleUrls: ['./role-assignment.component.scss'],
    providers: [
        RoleAssignmentService
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RoleAssignmentComponent extends AbstractRoleAssignmentComponent implements OnInit, OnDestroy {

    /** height of a row of the virtual scroll, the same formula as the rows (`_list-rows.scss`) */
    public readonly itemSize = new DensityItemSize(inject(ElementRef).nativeElement, 64, 4,
        () => this.viewport?.checkViewportSize());

    constructor(protected _service: RoleAssignmentService, protected _userService: UserService) {
        super(_service, _userService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.itemSize.update();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.itemSize.destroy();
    }

    /** number of the selected users */
    public get selectedUserCount(): number {
        return this.userList?.selectedOptions?.selected?.length ?? 0;
    }

    /** initials of the user for the avatar */
    public initials(user: UserListItem): string {
        return userInitials(user) || '?';
    }

    /** all roles of the version are selected */
    public allRolesSelected(net: ProcessVersion): boolean {
        return net.roles.length > 0 && net.roles.every(role => role.selected);
    }
}
