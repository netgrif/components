import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilesUploadComponent} from './files-upload.component';
import {FilesUploadItemComponent} from './files-upload-list/files-upload-item/files-upload-item.component';
import {FilesUploadListComponent} from './files-upload-list/files-upload-list.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MaterialModule, CovalentModule, TranslateLibModule, NAE_FILES_UPLOAD_COMPONENT} from '@netgrif/application-engine';


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
    providers: [
        {provide: NAE_FILES_UPLOAD_COMPONENT, useValue: FilesUploadComponent},
    ],
    exports: [FilesUploadComponent],
    entryComponents: [FilesUploadComponent]
})
export class SideMenuFilesUploadComponentModule {
}
