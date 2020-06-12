import {Injectable} from '@angular/core';
import {DataGroup} from '../../../resources/interface/data-groups';
import {Observable, Subject} from 'rxjs';
import {Task} from '../../../resources/interface/task';
import {LoggerService} from '../../../logger/services/logger.service';

/**
 * Acts as a communication interface between the Component that renders Task content and it's parent Component.
 *
 * Notable example of a parent Component is the {@link TaskPanelComponent}.
 *
 * Notable example of a task content renderer is the {@link TaskPanelContentComponent}.
 */
@Injectable()
export class TaskPanelContentService {
    $shouldCreate: Subject<DataGroup[]>;
    protected _task$: Subject<Task>;

    constructor(protected _logger: LoggerService) {
        this.$shouldCreate = new Subject<DataGroup[]>();
        this._task$ = new Subject<Task>();
    }

    /**
     * The task can be only set once. All other call do nothing and log an error.
     * @param task the Task that owns the content managed by this service
     */
    public set task(task: Task) {
        if (!this._task$.closed) {
            this._task$.next(task);
            this._task$.complete();
        } else {
            this._logger.error('TaskContentService can have it\'s task set only once');
        }
    }

    /**
     * Stream returns a single {@link Task} object and then completes.
     *
     * use [task]{@link TaskPanelContentService#task} setter method to set the task, that is then pushed into the underlying stream.
     */
    public get task$(): Observable<Task> {
        return this._task$.asObservable();
    }
}
