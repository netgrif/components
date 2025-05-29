import {Component, Inject, Optional} from '@angular/core';
import {AbstractTaskListComponent, InjectedTabData, LoggerService, NAE_TAB_DATA, TaskViewService} from '@netgrif/components-core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'nc-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    standalone: false
})
export class TaskListComponent extends AbstractTaskListComponent {
    constructor(protected _taskViewService: TaskViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected route?: ActivatedRoute) {
        super(_taskViewService, _log, injectedTabData, route);
    }
}
