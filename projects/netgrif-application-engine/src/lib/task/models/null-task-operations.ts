import {TaskOperations} from '../interfaces/task-operations';

/**
 * Null implementation of the {@link TaskOperations} interface.
 */
export class NullTaskOperations implements TaskOperations {
    /**
     * Calling this function does nothing
     */
    close(): void {
        return;
    }

    /**
     * Calling this function does nothing
     */
    open(): void {
        return;
    }

    /**
     * Calling this function does nothing
     */
    reload(): void {
        return;
    }

    /**
     * Calling this function does nothing
     */
    forceReload(): void {
        return;
    }
}
