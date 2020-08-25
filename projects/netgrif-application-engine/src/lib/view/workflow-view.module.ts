import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {SideMenuModule} from '../side-menu/side-menu.module';
import {HeaderModule} from '../header/header.module';
import {PanelModule} from '../panel/panel.module';
import {DataFieldsModule} from '../data-fields/data-fields.module';
import {TranslateLibModule} from '../translate/translate-lib.module';


@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        SideMenuModule,
        HeaderModule,
        PanelModule,
        DataFieldsModule,
        TranslateLibModule
    ]
})
export class WorkflowViewModule { }
