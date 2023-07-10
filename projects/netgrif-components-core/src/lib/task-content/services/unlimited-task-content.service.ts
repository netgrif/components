import {Injectable, Injector, OnDestroy} from '@angular/core';
import {TaskContentService} from './task-content.service';
import {Observable, ReplaySubject} from 'rxjs';
import {Task} from '../../resources/interface/task';
import {FieldConverterService} from './field-converter.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../logger/services/logger.service';
import {FrontActionsRegistryService} from "../../registry/front-actions-registry.service";

/**
 * Provides an implementation of the {@link TaskContentService} abstract class that allows
 * an unlimited number of calls to the setter of the managed Task object.
 *
 * If you want to limit the number of calls to 1 use {@link SingleTaskContentService} instead.
 */
@Injectable()
export class UnlimitedTaskContentService extends TaskContentService implements OnDestroy {

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
     * Setting a Task also emits it into the stream accessible by the [task$]{@link TaskContentService#task$} getter method.
     * @param task the Task that owns the content managed by this service
     */
    set task(task: Task) {
        this._task = task;
        this._task$.next(task);
    }

    /**
     * Stream returns a {@link Task} object every time this object is set.
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
        this._task$.complete();
    }
}
