import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataFieldTemplateComponent } from './data-field-template/data-field-template.component';
import { ButtonFieldComponent } from './button-field/button-field.component';
import {MatButtonModule} from "@angular/material";

@NgModule({
    declarations: [DataFieldTemplateComponent, ButtonFieldComponent],
    exports: [
        ButtonFieldComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule
    ]
})
export class DataFieldsModule { }
