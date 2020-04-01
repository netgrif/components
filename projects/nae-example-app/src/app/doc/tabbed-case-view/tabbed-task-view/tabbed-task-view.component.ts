import {Component, Inject} from '@angular/core';
import {InjectedTabbedTaskViewData, NAE_TAB_DATA, TabbedTaskView, TaskViewService} from '@netgrif/application-engine';

@Component({
    selector: 'nae-app-tabbed-task-view',
    templateUrl: './tabbed-task-view.component.html',
    styleUrls: ['./tabbed-task-view.component.scss'],
    providers: [TaskViewService]
})
export class TabbedTaskViewComponent extends TabbedTaskView {

    constructor(taskViewService: TaskViewService, @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedTaskViewData) {
        super(taskViewService, injectedTabData);
    }

}
