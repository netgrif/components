import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAssignComponent} from './user-assign.component';
import {UserAssignItemComponent} from './user-assign-list/user-assign-item/user-assign-item.component';
import {UserAssignListComponent} from './user-assign-list/user-assign-list.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {
    CovalentModule,
    MaterialModule,
    NAE_USER_ASSIGN_COMPONENT,
    TranslateLibModule,
    UtilityModule
} from '@netgrif/components-core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MultiUserAssignComponent } from './multi-user-assign.component';
import { MultiUserAssignListComponent } from './multi-user-assign-list/multi-user-assign-list.component';
import { MultiUserAssignItemComponent } from './multi-user-assign-list/multi-user-assign-item/multi-user-assign-item.component';


@NgModule({
    declarations: [
        UserAssignComponent,
        UserAssignItemComponent,
        UserAssignListComponent,
        MultiUserAssignComponent,
        MultiUserAssignListComponent,
        MultiUserAssignItemComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CovalentModule,
        FlexLayoutModule,
        FlexModule,
        FormsModule,
        TranslateLibModule,
        MatFormFieldModule,
        UtilityModule
    ],
    exports: [UserAssignComponent],
    providers: [
        { provide: NAE_USER_ASSIGN_COMPONENT, useValue: UserAssignComponent },
    ]
})
export class SideMenuUserAssignComponentModule {
}
