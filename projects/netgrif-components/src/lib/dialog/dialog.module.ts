import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewCaseDialogComponent} from './new-case-dialog/new-case-dialog.component';
import {
    CovalentModule,
    MaterialModule,
    SnackBarModule,
    TranslateLibModule,
    NAE_USER_ASSIGN_DIALOG_COMPONENT,
    NAE_ADMIN_IMPERSONATE_DIALOG_COMPONENT,
    NAE_NEW_CASE_DIALOG_COMPONENT,
    NAE_USER_IMPERSONATE_DIALOG_COMPONENT,
    NAE_SAVE_FILTER_DIALOG_COMPONENT,
    NAE_LOAD_FILTER_DIALOG_COMPONENT,
    FrontActionRegistryService,
    NAE_TASK_VIEW_COMPONENT, UtilityModule
} from '@netgrif/components-core';
import {A11yModule} from '@angular/cdk/a11y';
import {
    SideMenuUserAssignComponentModule
} from '../side-menu/content-components/user-assign/side-menu-user-assign-component.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {HotkeyModule} from 'angular2-hotkeys';
import {ImportNetDialogComponent} from './import-net-dialog/import-net-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserAssignDialogComponent} from './user-assign-dialog/user-assign-dialog.component';
import {AdminImpersonateDialogComponent} from './admin-impersonate-dialog/admin-impersonate-dialog.component';
import {
    SideMenuAdminImpersonateComponentModule
} from '../side-menu/content-components/admin-impersonate/side-menu-admin-impersonate-component.module';
import {UserImpersonateDialogComponent} from './user-impersonate-dialog/user-impersonate-dialog.component';
import {CaseViewComponentModule} from '../view/case-view/case-view.module';
import {HeaderComponentModule} from '../header/header.module';
import {FilterSelectorDialogComponent} from './filter-selector-dialog/filter-selector-dialog.component';
import {
    SideMenuFilterSelectorComponentModule
} from '../side-menu/content-components/filter-selector/side-menu-filter-selector-component.module';
import {LoadFilterDialogComponent} from './load-filter-dialog/load-filter-dialog.component';
import {SaveFilterDialogComponent} from './save-filter-dialog/save-filter-dialog.component';
import {PanelComponentModule} from '../panel/panel.module';
import {
    SideMenuLoadFilterComponentModule
} from '../side-menu/content-components/load-filter/side-menu-load-filter-component.module';
import {
    SideMenuSaveFilterComponentModule
} from '../side-menu/content-components/save-filter/side-menu-save-filter-component.module';
import {
    SideMenuMultiUserAssignComponentModule
} from '../side-menu/content-components/multi-user-assign/side-menu-multi-user-assign-component.module';
import { MultiUserAssignDialogComponent } from './multi-user-assign-dialog/multi-user-assign-dialog.component';
import { TaskViewDialogComponent } from './task-view-dialog/task-view-dialog.component';
import {openTaskDialog} from "./model/dialog-actions";

@NgModule({
    declarations: [
        NewCaseDialogComponent,
        ImportNetDialogComponent,
        UserAssignDialogComponent,
        AdminImpersonateDialogComponent,
        UserImpersonateDialogComponent,
        FilterSelectorDialogComponent,
        LoadFilterDialogComponent,
        SaveFilterDialogComponent,
        MultiUserAssignDialogComponent,
        TaskViewDialogComponent
    ],
    exports: [
        NewCaseDialogComponent,
        ImportNetDialogComponent,
        UserAssignDialogComponent,
        AdminImpersonateDialogComponent,
        UserImpersonateDialogComponent,
        FilterSelectorDialogComponent,
        LoadFilterDialogComponent,
        SaveFilterDialogComponent,
        MultiUserAssignDialogComponent,
        TaskViewDialogComponent
    ],
    imports: [
        BrowserAnimationsModule,
        SideMenuUserAssignComponentModule,
        TranslateLibModule,
        CommonModule,
        A11yModule,
        MaterialModule,
        CovalentModule,
        FlexLayoutModule,
        FlexModule,
        FormsModule,
        SnackBarModule,
        TranslateLibModule,
        SideMenuUserAssignComponentModule,
        SideMenuAdminImpersonateComponentModule,
        SideMenuFilterSelectorComponentModule,
        SideMenuLoadFilterComponentModule,
        SideMenuSaveFilterComponentModule,
        SideMenuMultiUserAssignComponentModule,
        CaseViewComponentModule,
        HeaderComponentModule,
        PanelComponentModule,
        HotkeyModule.forRoot(),
        UtilityModule
    ],
    providers: [
        {provide: NAE_USER_ASSIGN_DIALOG_COMPONENT, useValue: UserAssignDialogComponent},
        {provide: NAE_ADMIN_IMPERSONATE_DIALOG_COMPONENT, useValue: AdminImpersonateDialogComponent},
        {provide: NAE_USER_IMPERSONATE_DIALOG_COMPONENT, useValue: UserImpersonateDialogComponent},
        {provide: NAE_NEW_CASE_DIALOG_COMPONENT, useValue: NewCaseDialogComponent},
        {provide: NAE_SAVE_FILTER_DIALOG_COMPONENT, useValue: SaveFilterDialogComponent},
        {provide: NAE_LOAD_FILTER_DIALOG_COMPONENT, useValue: LoadFilterDialogComponent},
        {provide: NAE_TASK_VIEW_COMPONENT, useValue: TaskViewDialogComponent}
    ]
})
export class DialogComponentsModule {

    constructor(frontActionRegistry: FrontActionRegistryService) {
        frontActionRegistry.register('openDialog', openTaskDialog);
    }
}
