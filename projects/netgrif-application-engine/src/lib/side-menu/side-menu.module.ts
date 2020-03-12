import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SideMenuContainerComponent } from './side-menu-container/side-menu-container.component';
import {UserAssignComponent} from './user-assign/user-assign.component';
import {UserAssignListComponent} from './user-assign/user-assign-list/user-assign-list.component';
import {UserAssignItemComponent} from './user-assign/user-assign-list/user-assign-item/user-assign-item.component';
import {FilesUploadComponent} from './files-upload/files-upload.component';
import {FilesUploadListComponent} from './files-upload/files-upload-list/files-upload-list.component';
import {FilesUploadItemComponent} from './files-upload/files-upload-list/files-upload-item/files-upload-item.component';
import {MaterialModule} from '../material/material.module';
import {CovalentCommonModule} from '@covalent/core';

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
        MaterialModule,
        CovalentCommonModule
    ],
    entryComponents: [FilesUploadComponent],
    exports: [SideMenuContainerComponent, FilesUploadComponent]
})
export class SideMenuModule {
}
