import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleAssignmentComponent} from './role-assignment/role-assignment.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {TranslateLibModule} from '../translate/translate-lib.module';


@NgModule({
    declarations: [RoleAssignmentComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        FlexModule,
        TranslateLibModule
    ],
    exports: [
        RoleAssignmentComponent
    ],
    providers: []
})
export class AdministrationModule {
}
