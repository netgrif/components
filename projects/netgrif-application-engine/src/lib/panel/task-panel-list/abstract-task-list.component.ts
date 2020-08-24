import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TaskPanelData} from './task-panel-data/task-panel-data';
import {Observable} from 'rxjs';
import {HeaderColumn} from '../../header/models/header-column';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {LoggerService} from '../../logger/services/logger.service';

export abstract class AbstractTaskListComponent implements OnInit {

    @Input() tasks$: Observable<Array<TaskPanelData>>;
    @Input() loading$: Observable<boolean>;
    @Input() selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() responsiveBody = true;

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    constructor(protected _taskViewService: TaskViewService, protected _log: LoggerService) {
    }

    ngOnInit() {
    }

    public trackBy(idx: number, item: TaskPanelData): any {
        return item.task.stringId; // + (item.task.user ? item.task.user.email : '');
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._taskViewService.nextPage(this.viewport.getRenderedRange(), this.viewport.getDataLength());
    }
}
