import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataFieldTemplateComponent } from './data-field-template/data-field-template.component';
import { MultichoiceFieldComponent } from './multichoice-field/multichoice-field.component';
import { MultichoiceSelectFieldComponent } from './multichoice-field/multichoice-select-field/multichoice-select-field.component';
import { MultichoiceListFieldComponent } from './multichoice-field/multichoice-list-field/multichoice-list-field.component';
import {MatFormFieldModule, MatListModule, MatSelectModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [DataFieldTemplateComponent, MultichoiceFieldComponent, MultichoiceSelectFieldComponent, MultichoiceListFieldComponent],
    exports: [
        MultichoiceFieldComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatListModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class DataFieldsModule { }
