import { Component, EventEmitter, Inject, Input, OnDestroy, Optional, Output, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TaskPanelData } from '../task-panel-list/task-panel-data/task-panel-data';
import { MatExpansionPanel } from '@angular/material/expansion';
import { HeaderColumn } from '../../header/models/header-column';
import { TaskEventNotification } from '../../task-content/model/task-event-notification';
import { LoggerService } from '../../logger/services/logger.service';
import { NAE_TAB_DATA } from '../../tabs/tab-data-injection-token/tab-data-injection-token';
import { InjectedTabData } from '../../tabs/interfaces';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'ncc-abstract-single-task',
    template: ''
})
export abstract class AbstractSingleTaskComponent implements OnDestroy {

    protected _unsubscribe$: Subject<void>;
    protected _taskPanelRef: MatExpansionPanel;
    @Input() task$: Observable<TaskPanelData>;
    @Input() loading$: Observable<boolean>;
    @Input() selectedHeaders$: Observable<Array<HeaderColumn>>;
    @Input() responsiveBody = true;
    @Input() forceLoadDataOnOpen = false;
    @Input() textEllipsis = false;
    @Input() preventCollapse = true;
    @Input() hidePanelHeader = true;
    @Input() pageHeader: TemplateRef<any>;
    @Input() pageFooter: TemplateRef<any>;
    @Input() headerTitle: string;
    @Input() footerText: string;
    @Input() actionButtonTemplates: Array<TemplateRef<any>>;
    @Input() actionRowJustifyContent: 'space-between' | 'flex-start' | 'flex-end' | 'center' | 'space-around' |
        'initial' | 'start' | 'end' | 'left' | 'right' | 'revert' | 'inherit' | 'unset'
    @Output() taskEvent: EventEmitter<TaskEventNotification>;

    constructor(protected _log: LoggerService,
                protected _route: ActivatedRoute,
                @Optional() @Inject(NAE_TAB_DATA) _injectedTabData: InjectedTabData) {
        this.taskEvent = new EventEmitter<TaskEventNotification>();
        this._unsubscribe$ = new Subject<void>();
    }

    ngOnDestroy(): void {
        this.taskEvent.complete();
        this._unsubscribe$.complete();
    }

    public setPanelRef(panelRef: MatExpansionPanel) {
        this._taskPanelRef = panelRef;
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
}
