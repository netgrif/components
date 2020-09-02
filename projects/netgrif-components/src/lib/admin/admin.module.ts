import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleAssignmentComponent} from './role-assignment/role-assignment.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';


@NgModule({
    declarations: [RoleAssignmentComponent],
    exports: [RoleAssignmentComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule
    ]
})
export class AdminComponentModule {
}
