import {Component, ChangeDetectionStrategy, ElementRef, inject, OnDestroy, OnInit} from '@angular/core';
import {
    AbstractLdapGroupRoleAssignmentComponent,
    LdapGroupListItem,
    ProcessVersion,
    RoleAssignmentLdapGroupService,
    userInitials,
} from '@netgrif/components-core';
import {DensityItemSize} from '../density-item-size';

/**
 * Assigning process roles to LDAP groups (Material 3 master / detail, same layout as nc-role-assignment):
 * groups with a selection on the left, processes with their roles on the right.
 */
@Component({
    selector: 'nc-ldap-group-role-assignment',
    templateUrl: './ldap-group-role-assignment.component.html',
    styleUrls: ['./ldap-group-role-assignment.component.scss'],
    providers: [
        RoleAssignmentLdapGroupService
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LdapGroupRoleAssignmentComponent extends AbstractLdapGroupRoleAssignmentComponent implements OnInit, OnDestroy {

    /** height of a row of the virtual scroll, the same formula as the rows (`_list-rows.scss`) */
    public readonly itemSize = new DensityItemSize(inject(ElementRef).nativeElement, 64, 4,
        () => this.viewport?.checkViewportSize());

    constructor(protected _service: RoleAssignmentLdapGroupService) {
        super(_service);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.itemSize.update();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.itemSize.destroy();
    }

    /** number of the selected groups */
    public get selectedGroupCount(): number {
        return this.ldapGroupList?.selectedOptions?.selected?.length ?? 0;
    }

    /** initials of the group name for the avatar */
    public initials(group: LdapGroupListItem): string {
        return userInitials({fullName: (group.cn || group.dn || '').replace(/[=,_-]+/g, ' ')}) || '?';
    }

    /** all roles of the version are selected */
    public allRolesSelected(net: ProcessVersion): boolean {
        return net.roles.length > 0 && net.roles.every(role => role.selected);
    }
}
