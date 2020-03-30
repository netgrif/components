import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule, MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule, MatSelectModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import {PortalModule} from '@angular/cdk/portal';
import { SideMenuContainerComponent } from './side-menu-container/side-menu-container.component';
import {UserAssignComponent} from './user-assign/user-assign.component';
import {UserAssignListComponent} from './user-assign/user-assign-list/user-assign-list.component';
import {UserAssignItemComponent} from './user-assign/user-assign-list/user-assign-item/user-assign-item.component';
import {FilesUploadComponent} from './files-upload/files-upload.component';
import {FilesUploadListComponent} from './files-upload/files-upload-list/files-upload-list.component';
import {FilesUploadItemComponent} from './files-upload/files-upload-list/files-upload-item/files-upload-item.component';
import {MaterialModule} from '../material/material.module';
import { NewCaseComponent } from './new-case/new-case.component';
import {CovalentModule} from '../covalent/covalent.module';
import { ImportNetComponent } from './import-net/import-net.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    declarations: [
        SideMenuContainerComponent,
        NewCaseComponent,
        UserAssignComponent,
        UserAssignListComponent,
        UserAssignItemComponent,
        FilesUploadComponent,
        FilesUploadListComponent,
        FilesUploadItemComponent,
        SideMenuContainerComponent, ImportNetComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        MatSidenavModule,
        MatButtonModule,
        PortalModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlexLayoutModule
    ],
    entryComponents: [FilesUploadComponent, UserAssignComponent],
    exports: [
        SideMenuContainerComponent,
        NewCaseComponent,
        FilesUploadComponent,
        ImportNetComponent
    ]
})
export class SideMenuModule {
}
