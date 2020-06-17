import {TaskListOperations} from '../interfaces/task-list-operations';

/**
 * Null implementation of the {@link TaskListOperations} interface.
 */
export class NullTaskListOperations implements TaskListOperations {
    /**
     * Calling this function does nothing
     */
    reloadPage(): void {
    }
}
