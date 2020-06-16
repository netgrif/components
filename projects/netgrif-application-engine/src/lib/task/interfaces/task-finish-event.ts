/**
 * Represents an abstract execution of the finish event of a Task.
 *
 * It is used to communicate the finishing of a task as demanded by a policy to the concrete representation of tasks on the frontend.
 */
export interface TaskFinishEvent {
    finish: () => void;
}
