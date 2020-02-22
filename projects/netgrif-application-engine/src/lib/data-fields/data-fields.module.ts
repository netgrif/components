import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataFieldTemplateComponent } from './data-field-template/data-field-template.component';
import {AngularResizedEventModule} from "angular-resize-event";
import { UserFieldComponent } from './user-field/user-field.component';
import {MatButtonModule, MatIconModule} from "@angular/material";

@NgModule({
    declarations: [
        DataFieldTemplateComponent,
        UserFieldComponent
    ],
    exports: [
        UserFieldComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        AngularResizedEventModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class DataFieldsModule { }
