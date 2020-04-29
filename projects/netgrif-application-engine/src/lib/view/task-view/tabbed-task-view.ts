import {AbstractTaskView} from './abstract-task-view';
import {TaskViewService} from './task-view.service';
import {Inject} from '@angular/core';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token.module';
import {InjectedTabData} from '../../tabs/interfaces';
import {Filter} from '../../filter/models/filter';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';


export interface InjectedTabbedTaskViewData extends InjectedTabData {
    baseFilter: Filter;
}

export abstract class TabbedTaskView extends AbstractTaskView {
    protected constructor(taskViewService: TaskViewService,
                          @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedTaskViewData) {
        super(taskViewService, !!_injectedTabData.baseFilter ? _injectedTabData.baseFilter : new SimpleFilter('', FilterType.TASK, {}));
    }
}
