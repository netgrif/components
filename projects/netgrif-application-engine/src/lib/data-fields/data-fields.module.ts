import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataFieldTemplateComponent } from './data-field-template/data-field-template.component';
import { BooleanFieldComponent } from './boolean-field/boolean-field.component';
import {MatSlideToggleModule} from "@angular/material";

@NgModule({
    declarations: [DataFieldTemplateComponent, BooleanFieldComponent],
    exports: [
        BooleanFieldComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatSlideToggleModule
    ]
})
export class DataFieldsModule { }
