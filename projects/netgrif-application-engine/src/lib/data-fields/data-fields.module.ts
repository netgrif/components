import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {TextFieldComponent} from './text-field/text-field.component';
import {MatFormFieldModule, MatInputModule} from "@angular/material";

@NgModule({
    declarations: [DataFieldTemplateComponent],
    exports: [
        TextFieldComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class DataFieldsModule { }
