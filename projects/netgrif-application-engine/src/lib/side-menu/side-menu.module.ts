import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SideMenuContainerComponent} from './side-menu-container/side-menu-container.component';
import {FilesUploadComponent} from './files-upload/files-upload.component';
import {FilesUploadItemComponent} from './files-upload/files-upload-list/files-upload-item/files-upload-item.component';
import {FilesUploadListComponent} from './files-upload/files-upload-list/files-upload-list.component';
import {UserAssignItemComponent} from './user-assign/user-assign-list/user-assign-item/user-assign-item.component';
import {UserAssignListComponent} from './user-assign/user-assign-list/user-assign-list.component';
import {UserAssignComponent} from './user-assign/user-assign.component';
import {MaterialModule} from '../material/material.module';
import {CovalentModule} from '../covalent/covalent.module';

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
        CovalentModule
    ],
    entryComponents: [FilesUploadComponent, UserAssignComponent],
    exports: [SideMenuContainerComponent, FilesUploadComponent]
})
export class SideMenuModule {
}
