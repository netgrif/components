import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {AngularResizedEventModule} from "angular-resize-event";
import {FileFieldComponent} from './file-field/file-field.component';

@NgModule({
    declarations: [
        DataFieldTemplateComponent,
        FileFieldComponent
    ],
    exports: [
      FileFieldComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        AngularResizedEventModule
    ]
})
export class DataFieldsModule {
}
