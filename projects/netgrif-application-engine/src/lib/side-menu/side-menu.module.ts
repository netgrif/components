import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule, MatInputModule, MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from "@angular/material";
import {PortalModule} from "@angular/cdk/portal";
import { SideMenuContainerComponent } from './side-menu-container/side-menu-container.component';
import { UserAssignComponent } from './user-assign/user-assign.component';
import { UserAssignListComponent } from './user-assign/user-assign-list/user-assign-list.component';
import { UserAssignRowComponent } from './user-assign/user-assign-row/user-assign-row.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [SideMenuContainerComponent, UserAssignComponent, UserAssignListComponent, UserAssignRowComponent],
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
        ReactiveFormsModule
    ],
    exports: [SideMenuContainerComponent]
})
export class SideMenuModule {
}
