import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SideMenuComponentModule} from '../side-menu/side-menu.module';
import {HeaderComponentModule} from '../header/header.module';
import {PanelComponentModule} from '../panel/panel.module';
import {ImportNetComponent} from '../side-menu/content-components/import-net/import-net.component';
import {WorkflowViewComponent} from './workflow-view/workflow-view.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {DataFieldsComponentModule} from '../data-fields/data-fields.module';


@NgModule({
    declarations: [
        WorkflowViewComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        SideMenuComponentModule,
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
