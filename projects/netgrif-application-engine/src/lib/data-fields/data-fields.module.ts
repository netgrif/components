import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {AngularResizedEventModule} from "angular-resize-event";
import {FileFieldComponent} from './file-field/file-field.component';
import {MatButtonModule, MatIconModule, MatProgressBarModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {CovalentCommonModule} from "@covalent/core";
import {FileUploadService} from "./file-field/file-upload.service";
import {FileDownloadService} from "./file-field/file-download.service";

@NgModule({
    declarations: [
        DataFieldTemplateComponent,
        FileFieldComponent
    ],
    exports: [
      FileFieldComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        AngularResizedEventModule,
        MatIconModule,
        MatProgressBarModule,
        MatButtonModule,
        HttpClientModule,
        CovalentCommonModule
    ],
    providers: [
        FileUploadService,
        FileDownloadService
    ]
})
export class DataFieldsModule {
}
