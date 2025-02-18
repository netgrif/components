import {Component, Inject, Input, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {TaskViewService} from "./service/task-view.service";
import {NAE_TAB_DATA} from "../../tabs/tab-data-injection-token/tab-data-injection-token";
import {InjectedTabbedTaskViewData} from "./models/injected-tabbed-task-view-data";
import {ActivatedRoute} from "@angular/router";
import {AbstractSingleTaskViewComponent} from "./abstract-single-task-view.component";

@Component({
    selector: 'ncc-abstract-tabbed-single-task-view',
    template: ''
})
export abstract class AbstractTabbedSingleTaskViewComponent extends AbstractSingleTaskViewComponent implements OnDestroy {
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
