import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {AngularResizedEventModule} from "angular-resize-event";
import {FileFieldComponent} from './file-field/file-field.component';
import {MatButtonModule, MatIconModule, MatProgressBarModule, MatSnackBarModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {FileUploadService} from "./file-field/file-upload.service";
import {FileDownloadService} from "./file-field/file-download.service";
import {SideMenuModule} from "../side-menu/side-menu.module";

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
        SideMenuModule,
        MatSnackBarModule
    ],
    providers: [
        FileUploadService,
        FileDownloadService
    ]
})
export class DataFieldsModule {
}
