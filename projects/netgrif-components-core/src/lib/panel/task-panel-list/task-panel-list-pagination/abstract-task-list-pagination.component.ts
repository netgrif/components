import {Inject, Input, Optional} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AbstractDefaultTaskList} from '../default-task-panel-list/abstract-default-task-list';
import {TaskPanelData} from '../task-panel-data/task-panel-data';
import {TaskViewService} from '../../../view/task-view/service/task-view.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {NAE_TAB_DATA} from '../../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../../tabs/interfaces';

export abstract class AbstractTaskListPaginationComponent extends AbstractDefaultTaskList {

    public length: number;
    public pageSize = 20;
    public pageIndex = 0;
    public pageSizeOptions: Array<number> = [10, 20, 50];

    @Input()
    set tasks$(tasks: Observable<Array<TaskPanelData>>) {
        this._tasks$ = tasks.pipe((tap(() => {
            this.length = this._taskViewService.pagination.totalElements;
            this.pageIndex = this._taskViewService.pagination.number;
        })));
    }

    get tasks$(): Observable<Array<TaskPanelData>> {
        return this._tasks$;
    }

    constructor(protected _taskViewService: TaskViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected route?: ActivatedRoute) {
        super(_taskViewService, _log, injectedTabData, route);
    }

    public onPageChanged(e) {
        this.pageIndex = e.pageIndex;
        this.pageSize = e.pageSize;
        this._taskViewService.nextPagePagination(this.pageSize, this.pageIndex);
    }
}
