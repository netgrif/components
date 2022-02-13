import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PortalModule} from '@angular/cdk/portal';
import {SideMenuContainerComponent} from './side-menu-container/side-menu-container.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MaterialModule} from '@netgrif/components-core';

@NgModule({
    declarations: [
        SideMenuContainerComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        MatSidenavModule,
        PortalModule
    ],
    exports: [
        SideMenuContainerComponent
    ]
})
export class SideMenuComponentModule {
}
