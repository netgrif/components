import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataFieldTemplateComponent } from './data-field-template/data-field-template.component';
import { ParentWidthDependantStyleDirective } from './data-field-template/directives/parent-width-dependant-style.directive';

@NgModule({
  declarations: [
      DataFieldTemplateComponent,
      ParentWidthDependantStyleDirective
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class DataFieldsModule { }
