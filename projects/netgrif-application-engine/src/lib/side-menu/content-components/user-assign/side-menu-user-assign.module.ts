import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAssignComponent} from './user-assign.component';
import {UserAssignItemComponent} from './user-assign-list/user-assign-item/user-assign-item.component';
import {UserAssignListComponent} from './user-assign-list/user-assign-list.component';
import {MaterialModule} from '../../../material/material.module';
import {CovalentModule} from '../../../covalent/covalent.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        UserAssignComponent,
        UserAssignItemComponent,
        UserAssignListComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CovalentModule,
        FlexLayoutModule,
        FlexModule,
        FormsModule
    ],
    exports: [UserAssignComponent],
    entryComponents: [UserAssignComponent]
})
export class SideMenuUserAssignModule {
}
