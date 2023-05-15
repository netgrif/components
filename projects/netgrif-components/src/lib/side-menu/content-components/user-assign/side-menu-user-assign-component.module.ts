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

@NgModule({
    declarations: [
        UserAssignComponent,
        UserAssignItemComponent,
        UserAssignListComponent,
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
