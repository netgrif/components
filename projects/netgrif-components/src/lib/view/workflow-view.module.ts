import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponentModule} from '../header/header.module';
import {PanelComponentModule} from '../panel/panel.module';
import {WorkflowViewComponent} from './workflow-view/workflow-view.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {DataFieldsComponentModule} from '../data-fields/data-fields.module';


@NgModule({
    declarations: [
        WorkflowViewComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        HeaderComponentModule,
        PanelComponentModule,
        DataFieldsComponentModule,
        TranslateLibModule
    ],
    exports: [
        WorkflowViewComponent,
    ]
})
export class WorkflowViewComponentModule {
}
