import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule, MatInputModule, MatListModule,
    MatSidenavModule, MatSnackBarModule,
    MatToolbarModule
} from "@angular/material";
import {PortalModule} from "@angular/cdk/portal";
import { SideMenuContainerComponent } from './side-menu-container/side-menu-container.component';
import { UserAssignComponent } from './user-assign/user-assign.component';
import { UserAssignListComponent } from './user-assign/user-assign-list/user-assign-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserAssignItemComponent } from './user-assign/user-assign-list/user-assign-item/user-assign-item.component';

@NgModule({
    declarations: [SideMenuContainerComponent, UserAssignComponent, UserAssignListComponent, UserAssignItemComponent],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatButtonModule,
        PortalModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule
    ],
    exports: [SideMenuContainerComponent]
})
export class SideMenuModule {
}
