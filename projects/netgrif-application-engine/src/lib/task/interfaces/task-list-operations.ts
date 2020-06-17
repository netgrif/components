/**
 * Represents abstract operations on a list of tasks.
 * The concrete implementation depends on the way the tasks are displayed and represented by some specific Component.
 */
export interface TaskListOperations {
    /**
     * A function that notifies the Component that it should reload the current page of tasks.
     */
    reloadPage: () => void;
}
