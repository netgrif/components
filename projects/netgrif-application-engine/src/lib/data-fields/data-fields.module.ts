import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberFieldComponent} from './number-field/number-field.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {AngularResizedEventModule} from "angular-resize-event";

@NgModule({
    declarations: [
        DataFieldTemplateComponent,
        NumberFieldComponent
    ],
    exports: [
        NumberFieldComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        FlexLayoutModule,
        AngularResizedEventModule
    ]
})
export class DataFieldsModule { }
