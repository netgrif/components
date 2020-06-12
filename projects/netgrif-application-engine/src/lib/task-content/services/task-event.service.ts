import {Inject, Injectable} from '@angular/core';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {UserService} from '../../user/services/user.service';
import {NAE_TASK} from '../modules/task-injection-token.module';
import {Task} from '../../resources/interface/task';
import {Observable} from 'rxjs';
import {LoggerService} from '../../logger/services/logger.service';

@Injectable()
export class TaskEventService {

    protected _task: Task;
    protected _initialized = false;

    constructor(protected _taskViewService: TaskViewService,
                protected _userService: UserService,
                protected _logger: LoggerService,
                @Inject(NAE_TASK) _taskStream: Observable<Task>) {
        _taskStream.subscribe(task => {
            this._task = task;
            this._initialized = true;
        });
    }

    /**
     * Does nothing if the injected observable was resolved. Otherwise throws an error.
     */
    protected checkInitialized(): void {
        if (this._initialized) {
            return;
        }
        this._logger.debug('Some method of TaskEventService was called before the injected Observable resolved');
        throw new Error('TaskEventService is not yet initialized and it\'s methods cannot be called');
    }
}
