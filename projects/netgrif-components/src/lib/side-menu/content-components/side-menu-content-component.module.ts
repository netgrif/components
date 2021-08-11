import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideMenuUserAssignComponentModule} from './user-assign/side-menu-user-assign-component.module';
import {SideMenuNewCaseComponentModule} from './new-case/side-menu-new-case-component.module';
import {SideMenuImportNetComponentModule} from './import-net/side-menu-import-net-component.module';
import {SideMenuFilterSelectorComponentModule} from './filter-selector/side-menu-filter-selector-component.module';
import {SideMenuOptionSelectorComponentModule} from './option-selector/side-menu-option-selector-component.module';
import {SideMenuSaveFilterComponentModule} from './save-filter/side-menu-save-filter-component.module';
import {SideMenuLoadFilterComponentModule} from './load-filter/side-menu-load-filter-component.module';
import {
    NAE_NEW_CASE_COMPONENT,
    NAE_OPTION_SELECTOR_COMPONENT,
    NAE_SAVE_FILTER_COMPONENT,
    NAE_USER_ASSIGN_COMPONENT,
    NAE_LOAD_FILTER_COMPONENT
} from '@netgrif/application-engine';
import {UserAssignComponent} from './user-assign/user-assign.component';
import {NewCaseComponent} from './new-case/new-case.component';
import {OptionSelectorComponent} from './option-selector/option-selector.component';
import {SaveFilterComponent} from './save-filter/save-filter.component';
import {LoadFilterComponent} from './load-filter/load-filter.component';


@NgModule({
    imports: [
        CommonModule,
        SideMenuUserAssignComponentModule,
        SideMenuNewCaseComponentModule,
        SideMenuImportNetComponentModule,
        SideMenuFilterSelectorComponentModule,
        SideMenuOptionSelectorComponentModule,
        SideMenuSaveFilterComponentModule,
        SideMenuLoadFilterComponentModule,
    ],
    exports: [
        SideMenuUserAssignComponentModule,
        SideMenuNewCaseComponentModule,
        SideMenuImportNetComponentModule,
        SideMenuFilterSelectorComponentModule,
        SideMenuOptionSelectorComponentModule,
        SideMenuSaveFilterComponentModule,
        SideMenuLoadFilterComponentModule,
    ],
    providers: [
        {provide: NAE_USER_ASSIGN_COMPONENT, useValue: UserAssignComponent},
        {provide: NAE_NEW_CASE_COMPONENT, useValue: NewCaseComponent},
        {provide: NAE_OPTION_SELECTOR_COMPONENT, useValue: OptionSelectorComponent},
        {provide: NAE_SAVE_FILTER_COMPONENT, useValue: SaveFilterComponent},
        {provide: NAE_LOAD_FILTER_COMPONENT, useValue: LoadFilterComponent}
    ]
})
export class SideMenuContentComponentModule {
}
