import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilesUploadComponent} from './files-upload.component';
import {FilesUploadItemComponent} from './files-upload-list/files-upload-item/files-upload-item.component';
import {FilesUploadListComponent} from './files-upload-list/files-upload-list.component';
import {MaterialModule} from '../../../material/material.module';
import {CovalentModule} from '../../../covalent/covalent.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {TranslateLibModule} from '../../../translate/translate-lib.module';


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
        FormsModule,
        TranslateLibModule
    ],
    exports: [FilesUploadComponent],
    entryComponents: [FilesUploadComponent]
})
export class SideMenuFilesUploadModule {
}
