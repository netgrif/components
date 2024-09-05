import {Component, EventEmitter, Input, OnDestroy, Optional, Output} from '@angular/core';
import {FieldConverterService} from '../services/field-converter.service';
import {TaskContentService} from '../services/task-content.service';
import {LoggerService} from '../../logger/services/logger.service';
import {TaskEventNotification} from '../model/task-event-notification';
import {TaskEventService} from '../services/task-event.service';
import {FieldTypeResource} from '../model/field-type-resource';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {Subscription} from 'rxjs';
import {AsyncRenderingConfiguration} from '../model/async-rendering-configuration';
import {LayoutContainer} from '../../resources/interface/layout-container';

@Component({
    selector: 'ncc-abstract-task-content',
    template: ''
})
export abstract class AbstractTaskContentComponent implements OnDestroy {
    /**
     * Indicates whether data is being loaded from backend, or if it is being processed.
     */
    loading$: LoadingEmitter;
    /**
     * Emits `true` if there is at least one data field, that should be displayed. Emits `false` otherwise.
     */
    hasDataToDisplay: boolean;

    public layoutContainerContent: LayoutContainer;

    /**
     * Exists to allow references to the enum in the HTML
     */
    public fieldTypeResource = FieldTypeResource;

    /**
     * The translate text that should be displayed when the task contains no data.
     *
     * If a falsy value is provided the default text is displayed
     */
    @Input() noDataText: string;
    /**
     * The icon that should be displayed when the task contains no data.
     *
     * If a falsy value is provided the default icon is displayed
     */
    @Input() noDataIcon: string;
    /**
     * Whether an icon should be displayed when the no data message is shown.
     *
     * An icon is displayed by default
     */
    @Input() displayNoDataIcon = true;
    /**
     * Emits notifications about task events
     */
    @Output() taskEvent: EventEmitter<TaskEventNotification>;
    /**
     * The data fields that are currently displayed
     */
    protected _dataSource: Subscription;
    protected _subTaskContent: Subscription;
    protected _subTaskEvent: Subscription;
    protected _asyncRenderingConfig: AsyncRenderingConfiguration;
    protected _asyncRenderTimeout: number;

    /**
     * Defines the row height of one row in task content
     */
    protected rowHeight = 105;

    protected constructor(protected _fieldConverter: FieldConverterService,
                          public taskContentService: TaskContentService,
                          protected _logger: LoggerService,
                          @Optional() protected _taskEventService: TaskEventService = null) {
        this.loading$ = new LoadingEmitter(true);

        this._dataSource = this.taskContentService.$shouldCreate.subscribe((layoutContainer: LayoutContainer) => {
            this.loading$.off();
            this.layoutContainerContent = layoutContainer;
            this.hasDataToDisplay = !!layoutContainer && layoutContainer.hasData;
        });

        if (this._taskEventService !== null) {
            this.taskEvent = new EventEmitter<TaskEventNotification>();
            this._subTaskEvent = _taskEventService.taskEventNotifications$.subscribe(event => {
                this.taskEvent.emit(event);
            });
        }
    }

    ngOnDestroy(): void {
        this.loading$.complete();
        if (!!this._dataSource) {
            this._dataSource.unsubscribe();
        }
        if (this.taskEvent) {
            this.taskEvent.complete();
        }
        if (this._subTaskEvent) {
            this._subTaskEvent.unsubscribe();
        }
        if (this._asyncRenderTimeout !== undefined) {
            window.clearTimeout(this._asyncRenderTimeout);
        }
    }

    public get taskId(): string {
        return this.taskContentService.task.stringId;
    }
}
