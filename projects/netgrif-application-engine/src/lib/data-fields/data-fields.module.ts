import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataFieldTemplateComponent } from './data-field-template/data-field-template.component';

@NgModule({
  declarations: [DataFieldTemplateComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class DataFieldsModule { }
