import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule
} from "@angular/material";
import {PortalModule} from "@angular/cdk/portal";
import { SideMenuContainerComponent } from './side-menu-container/side-menu-container.component';
import { FilesUploadComponent } from './files-upload/files-upload.component';
import {CovalentCommonModule} from "@covalent/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FilesUploadListComponent } from './files-upload/files-upload-list/files-upload-list.component';
import { FilesUploadItemComponent } from './files-upload/files-upload-list/files-upload-item/files-upload-item.component';

@NgModule({
    declarations: [SideMenuContainerComponent, FilesUploadComponent, FilesUploadListComponent, FilesUploadItemComponent],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatButtonModule,
        PortalModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatIconModule,
        CovalentCommonModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    entryComponents: [FilesUploadComponent],
    exports: [SideMenuContainerComponent, FilesUploadComponent]
})
export class SideMenuModule {
}
