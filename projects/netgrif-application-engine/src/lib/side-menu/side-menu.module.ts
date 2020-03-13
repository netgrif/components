import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule, MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatToolbarModule
} from '@angular/material';
import {PortalModule} from '@angular/cdk/portal';
import { SideMenuContainerComponent } from './side-menu-container/side-menu-container.component';
import { NewCaseComponent } from './new-case/new-case.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [SideMenuContainerComponent, NewCaseComponent],
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
        MatSelectModule
    ],
    exports: [SideMenuContainerComponent, NewCaseComponent]
})
export class SideMenuModule {
}
