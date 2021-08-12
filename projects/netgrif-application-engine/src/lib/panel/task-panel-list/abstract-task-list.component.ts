import {EventEmitter, Inject, Input, OnDestroy, Optional, Output, ViewChild} from '@angular/core';
import {TaskPanelData} from './task-panel-data/task-panel-data';
import {Observable} from 'rxjs';
import {HeaderColumn} from '../../header/models/header-column';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskEventNotification} from '../../task-content/model/task-event-notification';
import {TabbedVirtualScrollComponent} from '../abstract/tabbed-virtual-scroll.component';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../tabs/interfaces';

export abstract class AbstractTaskListComponent extends TabbedVirtualScrollComponent implements OnDestroy {

    protected _allowMultiOpen = true;
    @Input() tasks$: Observable<Array<TaskPanelData>>;
    @Input() loading$: Observable<boolean>;
    @Input() selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() responsiveBody = true;
    @Input() forceLoadDataOnOpen = false;
    @Input() textEllipsis = false;
    @Input()
    set allowMultiOpen(bool: boolean) {
        this._allowMultiOpen = bool;
        this._taskViewService.allowMultiOpen = bool;
    }

    get allowMultiOpen() {
        return this._allowMultiOpen;
    }

    /**
     * Emits notifications about task events
     */
    @Output() taskEvent: EventEmitter<TaskEventNotification>;

    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    protected constructor(protected _taskViewService: TaskViewService,
                          protected _log: LoggerService,
                          @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData) {
        super(injectedTabData);
        this.taskEvent = new EventEmitter<TaskEventNotification>();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.taskEvent.complete();
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

    /**
     * Emits an event into this component's @Output attribute
     * @param event the event that will be emitted
     */
    public emitTaskEvent(event: TaskEventNotification) {
        this.taskEvent.emit(event);
    }
}
