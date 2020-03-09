import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule, MatSidenavModule} from "@angular/material";
import {PortalModule} from "@angular/cdk/portal";
import { SideMenuContainerComponent } from './side-menu-container/side-menu-container.component';

@NgModule({
    declarations: [
        SideMenuContainerComponent,
        UserAssignComponent,
        UserAssignListComponent,
        UserAssignItemComponent,
        FilesUploadComponent,
        FilesUploadListComponent,
        FilesUploadItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        Material
    ],
    entryComponents: [FilesUploadComponent],
    exports: [SideMenuContainerComponent, FilesUploadComponent]
})
export class SideMenuModule {
}
