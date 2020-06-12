import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Task} from '../../resources/interface/task';
import {Observable} from 'rxjs';


/**
 * Declares the `NAE_TASK` injection token
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TaskInjectionTokenModule { }

/**
 * Injection token for injection of {@link Task} object instances into various Components and Services
 * that are responsible for the rendering of task content.
 *
 * The Observable will emit a single Task and then complete.
 */
export const NAE_TASK = new InjectionToken<Observable<Task>>('NaeTask');
