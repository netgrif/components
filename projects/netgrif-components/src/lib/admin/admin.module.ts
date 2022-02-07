import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleAssignmentComponent} from './role-assignment/role-assignment.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {UserInviteComponent} from './user-invite/user-invite.component';


@NgModule({
    declarations: [RoleAssignmentComponent, UserInviteComponent],
    exports: [RoleAssignmentComponent, UserInviteComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule
    ]
})
export class AdminComponentModule {
}
