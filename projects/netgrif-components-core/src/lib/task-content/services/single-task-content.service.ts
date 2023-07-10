import {Injectable, Injector, OnDestroy} from '@angular/core';
import {TaskContentService} from './task-content.service';
import {FieldConverterService} from './field-converter.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../logger/services/logger.service';
import {Observable, ReplaySubject} from 'rxjs';
import {Task} from '../../resources/interface/task';
import {FrontActionsRegistryService} from "../../registry/front-actions-registry.service";

/**
 * Provides an implementation of the {@link TaskContentService} abstract class that allows only a
 * single call to the setter of the managed Task object.
 *
 * If you want to use an unlimited number of calls use {@link UnlimitedTaskContentService} instead.
 */
@Injectable()
export class SingleTaskContentService extends TaskContentService implements OnDestroy {

    /**
     * Acts as the underling stream for notifications on Task changes.
     *
     * `bufferSize` of the `ReplaySubject` instance is set to 1.
     */
    protected _task$: ReplaySubject<Task>;

    constructor(_fieldConverterService: FieldConverterService,
                _snackBarService: SnackBarService,
                _translate: TranslateService,
                _logger: LoggerService,
                _frontActionsRegistry: FrontActionsRegistryService,
                _injector: Injector) {
        super(_fieldConverterService, _snackBarService, _translate, _logger, _frontActionsRegistry, _injector);
        this._task$ = new ReplaySubject<Task>(1);
    }

    /**
     * @returns the Task object if set and `undefined` otherwise
     */
    get task(): Task | undefined {
        return this._task;
    }

    /**
     * The task can be only set once. All other call do nothing and log an error.
     * @param task the Task that owns the content managed by this service
     */
    set task(task: Task) {
        if (!this._task$.closed) {
            this._task = task;
            this._task$.next(task);
            this._task$.complete();
        } else {
            this._logger.error('TaskContentService can have it\'s task set only once');
        }
    }

    /**
     * Stream returns a single {@link Task} object and then completes.
     *
     * Use [task]{@link TaskContentService#task} setter method to set the Task.
     */
    get task$(): Observable<Task> {
        return this._task$.asObservable();
    }

    /**
     * Completes the underling stream.
     */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (!this._task$.closed) {
            this._task$.complete();
        }
    }
}
