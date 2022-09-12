import {Component} from '@angular/core';
import {
    AbstractLdapGroupRoleAssignmentComponent,
    RoleAssignmentLdapGroupService,
} from '@netgrif/components-core';

@Component({
    selector: 'nc-ldap-group-role-assignment',
    templateUrl: './ldap-group-role-assignment.component.html',
    styleUrls: ['./ldap-group-role-assignment.component.scss'],
    providers: [
        RoleAssignmentLdapGroupService
    ]
})
export class LdapGroupRoleAssignmentComponent extends AbstractLdapGroupRoleAssignmentComponent {
    constructor(protected _service: RoleAssignmentLdapGroupService) {
        super(_service);
    }
}
