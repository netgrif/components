import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TabDataInjectionTokenModule { }

export const NAE_TASK_DATA = new InjectionToken<any[]>('NaeTaskData');
