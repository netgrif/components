import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Resources} from '../../panel/task-panel/task-panel-content/resources';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class TabDataInjectionTokenModule { }

export const NAE_TASK_DATA = new InjectionToken<Resources>('NaeTaskData');
