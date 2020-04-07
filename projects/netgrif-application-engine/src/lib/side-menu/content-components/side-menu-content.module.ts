import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideMenuUserAssignModule} from './user-assign/side-menu-user-assign.module';
import {SideMenuNewCaseModule} from './new-case/side-menu-new-case.module';
import {SideMenuImportNetModule} from './import-net/side-menu-import-net.module';
import {SideMenuFilesUploadModule} from './files-upload/side-menu-files-upload.module';


@NgModule({
    imports: [
        CommonModule,
        SideMenuUserAssignModule,
        SideMenuNewCaseModule,
        SideMenuImportNetModule,
        SideMenuFilesUploadModule
    ],
    exports: [
        SideMenuUserAssignModule,
        SideMenuNewCaseModule,
        SideMenuImportNetModule,
        SideMenuFilesUploadModule
    ]
})
export class SideMenuContentModule {
}
