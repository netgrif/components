import {AbstractTaskViewComponent} from './abstract-task-view';
import {TaskViewService} from './service/task-view.service';
import {Component, Inject, OnDestroy} from '@angular/core';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabbedTaskViewData} from './models/injected-tabbed-task-view-data';
import {Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ncc-abstract-tabbed-task-view',
    template: ''
})
export abstract class AbstractTabbedTaskViewComponent extends AbstractTaskViewComponent implements OnDestroy {
    protected subTaskView: Subscription;

    protected constructor(taskViewService: TaskViewService,
                          @Inject(NAE_TAB_DATA) protected _injectedTabData: InjectedTabbedTaskViewData,
                          _activatedRoute?: ActivatedRoute) {
        super(taskViewService, _activatedRoute);
        this.subTaskView = taskViewService.closeTab.subscribe(() => {
            _injectedTabData.tabViewRef.closeTabIndex(_injectedTabData.tabViewRef.currentlySelectedTab());
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.subTaskView.unsubscribe();
    }
}
