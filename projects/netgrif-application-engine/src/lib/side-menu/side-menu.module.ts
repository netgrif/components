import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PortalModule} from '@angular/cdk/portal';
import {MaterialModule} from '../material/material.module';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        MatSidenavModule,
        PortalModule
    ],
    exports: [
    ]
})
export class SideMenuModule {
}
