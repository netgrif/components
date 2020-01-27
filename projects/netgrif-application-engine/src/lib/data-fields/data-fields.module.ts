import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataFieldTemplateComponent } from './data-field-template/data-field-template.component';
import { DateTimeFieldComponent } from './date-time-field/date-time-field.component';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";

@NgModule({
    declarations: [DataFieldTemplateComponent, DateTimeFieldComponent],
    exports: [
        DateTimeFieldComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        NgxMaterialTimepickerModule
    ]
})
export class DataFieldsModule { }
