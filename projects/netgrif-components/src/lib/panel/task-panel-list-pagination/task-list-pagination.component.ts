import {
    Component,
    Inject,
    Optional,
} from '@angular/core';
import {
    InjectedTabData,
    LoggerService,
    NAE_TAB_DATA,
    TaskViewService,
    NetgrifPaginatorIntl,
    AbstractTaskListPaginationComponent
} from '@netgrif/components-core';
import {ActivatedRoute} from '@angular/router';
import {MatPaginatorIntl} from '@angular/material/paginator';

@Component({
    selector: 'nc-task-list-pagination',
    templateUrl: './task-list-pagination.component.html',
    styleUrls: ['./task-list-pagination.component.scss'],
    providers: [{provide: MatPaginatorIntl, useClass: NetgrifPaginatorIntl}],
    standalone: false
})
export class TaskListPaginationComponent extends AbstractTaskListPaginationComponent {
    constructor(protected _taskViewService: TaskViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected route?: ActivatedRoute) {
        super(_taskViewService, _log, injectedTabData, route);
    }
}
