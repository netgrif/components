import {MatExpansionPanel} from '@angular/material/expansion';
import {ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/operators';
import {TabbedVirtualScrollComponent} from '../../abstract/tabbed-virtual-scroll.component';
import {AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, Optional, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {TaskPanelData} from '../task-panel-data/task-panel-data';
import {HeaderColumn} from '../../../header/models/header-column';
import {TaskEventNotification} from '../../../task-content/model/task-event-notification';
import {TaskViewService} from '../../../view/task-view/service/task-view.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {NAE_TAB_DATA} from '../../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../../tabs/interfaces';


@Component({
    selector: 'ncc-abstract-default-task-list',
    template: ''
})
export abstract class AbstractDefaultTaskListComponent extends TabbedVirtualScrollComponent implements AfterViewInit, OnDestroy {

    protected _tasks$: Observable<Array<TaskPanelData>>;
    protected _redirectTaskId: string;
    protected _unsubscribe$: Subject<void>;
    protected _allowMultiOpen = true;
    protected _taskPanelRefs: Map<string, MatExpansionPanel>;
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

    get allowMultiOpen(): boolean {
        return this._allowMultiOpen;
    }

    /**
     * Emits notifications about task events
     */
    @Output() taskEvent: EventEmitter<TaskEventNotification>;

    constructor(protected _taskViewService: TaskViewService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                protected route?: ActivatedRoute) {
        super(injectedTabData);
        this.taskEvent = new EventEmitter<TaskEventNotification>();
        this._taskPanelRefs = new Map<string, MatExpansionPanel>();
        this._unsubscribe$ = new Subject<void>();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.taskEvent.complete();
        this._unsubscribe$.complete();
    }

    ngAfterViewInit() {
        this.onRedirect();
    }

    public trackBy(_idx: number, item: TaskPanelData): any {
        return item.task.stringId;
    }

    /**
     * Emits an event into this component's @Output attribute
     * @param event the event that will be emitted
     */
    public emitTaskEvent(event: TaskEventNotification) {
        this.taskEvent.emit(event);
    }

    public addToPanelRefs(task: TaskPanelData, panelRef: MatExpansionPanel) {
        this._taskPanelRefs.set(task.task.stringId, panelRef);
    }

    public onRedirect() {
        this.route.queryParams.pipe(filter(pm => !!pm['taskId'])).subscribe(pm => {
            this._redirectTaskId = pm['taskId'];
            this._tasks$.pipe().subscribe(tasks => {
                const task = tasks.find(t => t.task.stringId === this._redirectTaskId);
                if (!!task && !task.initiallyExpanded) {
                    this._taskPanelRefs.get(this._redirectTaskId).open();
                    this._taskPanelRefs.get(this._redirectTaskId).expanded = true;
                    this._unsubscribe$.next();
                }
            });
        });
    }
}
