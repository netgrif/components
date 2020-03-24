import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataGroup} from '../../resources/interface/data-groups';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class TabDataInjectionTokenModule { }

export const NAE_TASK_DATA = new InjectionToken<Array<DataGroup>>('NaeTaskData');
