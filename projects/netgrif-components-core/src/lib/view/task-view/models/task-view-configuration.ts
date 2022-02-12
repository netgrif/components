import {Observable} from 'rxjs';
import {TaskEndpoint} from './task-endpoint';

/**
 * Configuration of behavior of task list managed by task view
 */
export interface TaskViewConfiguration {
    /**
     * If both this and the deprecated {@link NAE_PREFERRED_TASK_ENDPOINT} is provided, this option takes precedence.
     */
    preferredEndpoint?: TaskEndpoint;
    /**
     * If not present defaults to `of(true)`
     */
    initiallyOpenOneTask?: Observable<boolean>;
    /**
     * If not present defaults to `of(true)`
     */
    closeTaskTabOnNoTasks?: Observable<boolean>;
}
