import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideMenuUserAssignModule} from './user-assign/side-menu-user-assign.module';
import {SideMenuNewCaseModule} from './new-case/side-menu-new-case.module';
import {SideMenuImportNetModule} from './import-net/side-menu-import-net.module';
import {SideMenuFilesUploadModule} from './files-upload/side-menu-files-upload.module';
import {SideMenuFilterSelectorModule} from './filter-selector/side-menu-filter-selector.module';
import {SideMenuOptionSelectorModule} from './option-selector/side-menu-option-selector.module';
import {
    NAE_FILES_UPLOAD_COMPONENT,
    NAE_USER_ASSIGN_COMPONENT,
    NAE_NEW_CASE_COMPONENT,
    NAE_OPTION_SELECTOR_COMPONENT
} from '@netgrif/application-engine';
import {FilesUploadComponent} from './files-upload/files-upload.component';
import {UserAssignComponent} from './user-assign/user-assign.component';
import {NewCaseComponent} from './new-case/new-case.component';
import {OptionSelectorComponent} from './option-selector/option-selector.component';


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
    ],
    providers: [
        {provide: NAE_FILES_UPLOAD_COMPONENT, useValue: FilesUploadComponent},
        {provide: NAE_USER_ASSIGN_COMPONENT, useValue: UserAssignComponent},
        {provide: NAE_NEW_CASE_COMPONENT, useValue: NewCaseComponent},
        {provide: NAE_OPTION_SELECTOR_COMPONENT, useValue: OptionSelectorComponent}
        ]
})
export class SideMenuContentModule {
}
