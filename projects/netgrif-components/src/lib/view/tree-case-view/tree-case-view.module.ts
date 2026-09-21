import {NgModule} from '@angular/core';
import {TreeComponent} from './tree-component/tree.component';
import {TreeTaskContentComponent} from './tree-task-content/tree-task-content.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {PanelComponentModule} from '../../panel/panel.module';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {TaskContentComponentModule} from '../../task-content/task-content.module';
import {AddChildNodeComponent} from './tree-component/add-child-node/add-child-node.component';
import {RemoveNodeComponent} from './tree-component/remove-node/remove-node.component';
import {DataFieldsComponentModule} from '../../data-fields/data-fields.module';

@NgModule({
    declarations: [
        TreeComponent,
        TreeTaskContentComponent,
        AddChildNodeComponent,
        RemoveNodeComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        DataFieldsComponentModule,
        TranslateLibModule,
        PanelComponentModule,
        TaskContentComponentModule
    ],
    exports: [
        TreeComponent,
        TreeTaskContentComponent,
    ]
})
export class TreeCaseViewComponentModule {
}
