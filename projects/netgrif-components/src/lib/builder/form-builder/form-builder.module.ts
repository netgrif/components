import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {Gridster, GridsterItem} from 'angular-gridster2';
import {ResizableModule} from 'angular-resizable-element';
import {ModelerModule} from '../modeler/modeler.module';
import {EditPanelComponent} from './edit-panel/edit-panel.component';
import {FieldListComponent} from './field-list/field-list.component';
import {FormBuilderComponent} from './form-builder.component';
import {GridsterDataFieldComponent} from './gridster/gridster-datafield/gridster-data-field.component';
import {GridsterComponent} from './gridster/gridster.component';
import {InfoLabelComponent} from './info-label/info-label.component';
import {MaterialModule} from '@netgrif/components-core';
import { DataFieldsComponentModule } from "../../data-fields/data-fields.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    declarations: [
        EditPanelComponent,
        FieldListComponent,
        FormBuilderComponent,
        GridsterComponent,
        GridsterDataFieldComponent,
        InfoLabelComponent,
    ],
    exports: [
        FormBuilderComponent
    ],
    imports: [
        CommonModule,
        DataFieldsComponentModule,
        DragDropModule,
        FlexLayoutModule,
        FormsModule,
        Gridster,
        GridsterItem,
        MaterialModule,
        ReactiveFormsModule,
        ResizableModule,
        ModelerModule,
        TranslateModule
    ]
})
export class FormBuilderModule {
}
