import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {SideMenuModule} from '../side-menu/side-menu.module';
import {HeaderModule} from '../header/header.module';
import {PanelModule} from '../panel/panel.module';
import {DataFieldsModule} from '../data-fields/data-fields.module';
import {ImportNetComponent} from '../side-menu/content-components/import-net/import-net.component';
import {WorkflowViewComponent} from './workflow-view/workflow-view.component';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {TreeCaseViewComponent} from './tree-case-view/tree-case-view.component';
import { TreeComponentComponent } from './tree-case-view/tree-component/tree-component.component';


@NgModule({
    declarations: [
        WorkflowViewComponent,
        TreeCaseViewComponent,
        TreeComponentComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        SideMenuModule,
        HeaderModule,
        PanelModule,
        DataFieldsModule,
        TranslateLibModule
    ],
    exports: [
        WorkflowViewComponent,
        TreeCaseViewComponent
    ],
    entryComponents: [
        ImportNetComponent
    ]

})
export class WorkflowViewModule { }
