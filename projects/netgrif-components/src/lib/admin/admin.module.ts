import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleAssignmentComponent} from './role-assignment/role-assignment.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {UserInviteComponent} from './user-invite/user-invite.component';
import {LdapGroupRoleAssignmentComponent} from './ldap-group-role-assignment/ldap-group-role-assignment.component';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
    declarations: [RoleAssignmentComponent, LdapGroupRoleAssignmentComponent, UserInviteComponent],
    exports: [RoleAssignmentComponent, LdapGroupRoleAssignmentComponent, UserInviteComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        MatFormFieldModule
    ]
})
export class AdminComponentModule {
}
