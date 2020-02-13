import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule, MatSidenavModule} from "@angular/material";
import {PortalModule} from "@angular/cdk/portal";
import { SideMenuContainerComponent } from './side-menu-container/side-menu-container.component';

@NgModule({
    declarations: [SideMenuContainerComponent],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatButtonModule,
        PortalModule
    ],
    exports: [SideMenuContainerComponent]
})
export class SideMenuModule {
}
