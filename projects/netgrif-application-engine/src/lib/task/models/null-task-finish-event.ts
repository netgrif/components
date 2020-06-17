import {TaskFinishEvent} from '../interfaces/task-finish-event';

/**
 * Null implementation of the {@link TaskFinishEvent} interface.
 */
export class NullTaskFinishEvent implements TaskFinishEvent {
    /**
     * Calling this function does nothing
     */
    finish(): void {
    }
}
