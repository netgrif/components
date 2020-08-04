import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideMenuUserAssignModule} from './user-assign/side-menu-user-assign.module';
import {SideMenuNewCaseModule} from './new-case/side-menu-new-case.module';
import {SideMenuImportNetModule} from './import-net/side-menu-import-net.module';
import {SideMenuFilesUploadModule} from './files-upload/side-menu-files-upload.module';
import {SideMenuFilterSelectorModule} from './filter-selector/side-menu-filter-selector.module';
import {SideMenuOptionSelectorModule} from './option-selector/side-menu-option-selector.module';


@NgModule({
    imports: [
        CommonModule,
        SideMenuUserAssignModule,
        SideMenuNewCaseModule,
        SideMenuImportNetModule,
        SideMenuFilesUploadModule,
        SideMenuFilterSelectorModule,
        SideMenuOptionSelectorModule,
    ],
    exports: [
        SideMenuUserAssignModule,
        SideMenuNewCaseModule,
        SideMenuImportNetModule,
        SideMenuFilesUploadModule,
        SideMenuFilterSelectorModule,
        SideMenuOptionSelectorModule,
    ]
})
export class SideMenuContentModule {
}
