import {Inject, Input, Optional, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../tabs/interfaces';
import {ActivatedRoute} from '@angular/router';
import {AbstractDefaultTaskList} from './default-task-panel-list/abstract-default-task-list';
import {Observable} from 'rxjs';
import {TaskPanelData} from './task-panel-data/task-panel-data';

@Component({
    selector: 'ncc-abstract-task-list',
    template: ''
})
export abstract class AbstractTaskListComponent extends AbstractDefaultTaskList {

    @Input()
    set tasks$(tasks: Observable<Array<TaskPanelData>>) {
        this._tasks$ = tasks;
    }

    get tasks$(): Observable<Array<TaskPanelData>> {
        return this._tasks$;
    }
    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    protected constructor(protected _taskViewService: TaskViewService,
                          protected _log: LoggerService,
                          @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                          protected route?: ActivatedRoute) {
        super(_taskViewService, _log, injectedTabData, route);
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._taskViewService.nextPage(this.viewport.getRenderedRange(), this.viewport.getDataLength());
    }
}
