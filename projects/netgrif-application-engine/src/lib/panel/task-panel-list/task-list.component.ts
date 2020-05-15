import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TaskPanelData} from './task-panel-data/task-panel-data';
import {Observable} from 'rxjs';
import {HeaderColumn} from '../../header/models/header-column';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {TaskViewService} from '../../view/task-view/task-view.service';
import {LoggerService} from '../../logger/services/logger.service';


@Component({
    selector: 'nae-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

    @Input() tasks$: Observable<Array<TaskPanelData>>;
    @Input() loading$: Observable<boolean>;
    @Input() selectedHeaders$: Observable<Array<HeaderColumn>>;

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    constructor(private _taskViewService: TaskViewService, private _log: LoggerService) {
    }

    ngOnInit() {
    }

    public trackBy(i): any {
        return i;
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._taskViewService.nextPage(this.viewport.getRenderedRange().end, this.viewport.getDataLength());
    }
}
