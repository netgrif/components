import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataFieldTemplateComponent } from './data-field-template/data-field-template.component';
import {AngularResizedEventModule} from "angular-resize-event";

@NgModule({
  declarations: [
      DataFieldTemplateComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularResizedEventModule
  ]
})
export class DataFieldsModule { }
