import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule
} from '@angular/material';
import {PortalModule} from '@angular/cdk/portal';
import { SideMenuContainerComponent } from './side-menu-container/side-menu-container.component';
import { NewCaseComponent } from './new-case/new-case.component';
import { UserAssignComponent } from './user-assign/user-assign.component';
import { UserAssignListComponent } from './user-assign/user-assign-list/user-assign-list.component';
import { UserAssignRowComponent } from './user-assign/user-assign-row/user-assign-row.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        SideMenuContainerComponent,
        NewCaseComponent,
        UserAssignComponent,
        UserAssignListComponent,
        UserAssignRowComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatButtonModule,
        PortalModule,
        MatStepperModule,
        MatInputModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatIconModule,
        MatFormFieldModule,
        MatListModule,
        FormsModule,
    ],
    exports: [
        SideMenuContainerComponent,
        NewCaseComponent
    ]
})
export class SideMenuModule {
}
