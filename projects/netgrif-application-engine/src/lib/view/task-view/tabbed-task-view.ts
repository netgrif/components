import {AbstractTaskView} from './abstract-task-view';
import {TaskViewService} from './service/task-view.service';
import {Inject} from '@angular/core';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token.module';
import {InjectedTabbedTaskViewData} from './models/injected-tabbed-task-view-data';

export abstract class TabbedTaskView extends AbstractTaskView {
    protected constructor(taskViewService: TaskViewService,
                          @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedTaskViewData) {
        super(taskViewService);
        taskViewService.closeTab.subscribe(() => {
            _injectedTabData.tabViewRef.closeTabIndex(_injectedTabData.tabViewRef.currentlySelectedTab());
        });
    }
}
