import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilesUploadComponent} from './files-upload.component';
import {FilesUploadItemComponent} from './files-upload-list/files-upload-item/files-upload-item.component';
import {FilesUploadListComponent} from './files-upload-list/files-upload-list.component';
import {MaterialModule} from '../../../material/material.module';
import {CovalentModule} from '../../../covalent/covalent.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        FilesUploadComponent,
        FilesUploadItemComponent,
        FilesUploadListComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CovalentModule,
        FlexLayoutModule,
        FlexModule,
        FormsModule
    ],
    exports: [FilesUploadComponent],
    entryComponents: [FilesUploadComponent]
})
export class SideMenuFilesUploadModule {
}
