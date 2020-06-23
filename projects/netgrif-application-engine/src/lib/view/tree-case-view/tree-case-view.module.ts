import {NgModule} from '@angular/core';
import {TreeCaseViewComponent} from './tree-case-view.component';
import {TreeComponent} from './tree-component/tree.component';
import {TreeTaskContentComponent} from './tree-task-content/tree-task-content.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material/material.module';
import {DataFieldsModule} from '../../data-fields/data-fields.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {PanelModule} from '../../panel/panel.module';
import {TaskContentModule} from '../../task-content/task-content.module';
import { AddChildNodeComponent } from './tree-component/add-child-node/add-child-node.component';

@NgModule({
    declarations: [
        TreeCaseViewComponent,
        TreeComponent,
        TreeTaskContentComponent,
        AddChildNodeComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        DataFieldsModule,
        TranslateLibModule,
        PanelModule,
        TaskContentModule
    ],
    exports: [
        TreeCaseViewComponent
    ],
    entryComponents: [
    ]

})
export class TreeCaseViewModule { }
