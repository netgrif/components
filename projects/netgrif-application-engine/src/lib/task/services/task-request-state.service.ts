import {Injectable, OnDestroy} from '@angular/core';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {TaskContentService} from '../../task-content/services/task-content.service';
import {TaskHandlingService} from './task-handling-service';

/**
 * Holds information about the state of backend requests regarding a single {@link Task} instance
 * held within the {@link TaskContentService}.
 *
 * This Service is used by many other Services that handle the necessary logic for working with a single Task on frontend.
 */
@Injectable()
export class TaskRequestStateService extends TaskHandlingService implements OnDestroy {

    protected _loading: LoadingEmitter;
    protected _updating: LoadingEmitter;

    constructor(_taskContent: TaskContentService) {
        super(_taskContent);
        this._loading = new LoadingEmitter();
        this._updating = new LoadingEmitter();
        _taskContent.task$.subscribe(() => {
            this._loading.off();
            this._updating.off();
        });
    }

    /**
     * @returns whether the task is currently loading, or `undefined` if the queried task is
     * not held within the injected {@link TaskContentService}.
     *
     * @param taskId stringId of the {@link Task} we would like to get information about.
     * If no value is provided, the state of the task held in the {@link TaskContentService} will be returned.
     */
    public isLoading(taskId?: string): boolean | undefined {
        if (taskId !== undefined && !this.isTaskRelevant(taskId)) {
            return undefined;
        }
        return this._loading.isActive;
    }

    /**
     * Changes the state of the loading indicator to `true`,
     * if the task held within the injected {@link TaskContentService} has the Id that is provided as argument.
     * This method does nothing otherwise.
     *
     * @param taskId stringId of the {@link Task} who's loading state we want to change
     */
    public startLoading(taskId: string): void {
        if (!this.isTaskRelevant(taskId)) {
            return;
        }
        this._loading.on();
    }

    /**
     * Changes the state of the loading indicator to `false`,
     * if the task held within the injected {@link TaskContentService} has the Id that is provided as argument.
     * This method does nothing otherwise.
     *
     * @param taskId stringId of the {@link Task} who's loading state we want to change
     */
    public stopLoading(taskId: string): void {
        if (!this.isTaskRelevant(taskId)) {
            return;
        }
        this._loading.off();
    }

    /**
     * @returns whether the task is currently updating it's data fields, or `undefined` if the queried task is
     * not held within the injected {@link TaskContentService}.
     *
     * @param taskId stringId of the {@link Task} we would like to get information about.
     * If no value is provided, the state of the task held in the {@link TaskContentService} will be returned.
     */
    public isUpdating(taskId?: string): boolean | undefined {
        if (taskId !== undefined && !this.isTaskRelevant(taskId)) {
            return undefined;
        }
        return this._updating.isActive;
    }

    /**
     * Changes the state of the updating indicator to `true`,
     * if the task held within the injected {@link TaskContentService} has the Id that is provided as argument.
     * This method does nothing otherwise.
     *
     * @param taskId stringId of the {@link Task} who's loading state we want to change
     */
    public startUpdating(taskId: string): void {
        if (!this.isTaskRelevant(taskId)) {
            return;
        }
        this._updating.on();
    }

    /**
     * Changes the state of the updating indicator to `false`,
     * if the task held within the injected {@link TaskContentService} has the Id that is provided as argument.
     * This method does nothing otherwise.
     *
     * @param taskId stringId of the {@link Task} who's loading state we want to change
     */
    public stopUpdating(taskId: string): void {
        if (!this.isTaskRelevant(taskId)) {
            return;
        }
        this._updating.off();
    }

    ngOnDestroy(): void {
        this._loading.complete();
        this._updating.complete();
    }
}
