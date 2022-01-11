/**
 * Represents abstract operations on a task.
 * The concrete implementation depends on the way the tasks are displayed and represented by some specific Component.
 *
 * For example if tasks are panels, then the [open]{@link TaskOperations#open} operation corresponds to the panels expansion
 * and the [close]{@link TaskOperations#close} operation corresponds to the panel collapsing.
 */
export interface TaskOperations {
    /**
     * A function that opens the task's representation.
     *
     * Eg. a task panel expanding.
     */
    open: () => void;
    /**
     * A function that closes the Task's representation.
     *
     * Eg. a task panel collapsing.
     */
    close: () => void;
    /**
     * A function that reloads the Task's representation.
     * If the representation contains more Tasks it is advised to reload all of them.
     *
     * Eg. the current page of a task list is reloaded
     */
    reload: () => void;
    /**
     * A function that reloads the Task's representation.
     * If the representation contains more Tasks it is advised to reload all of them.
     *
     * Eg. the current page of a task list is reloaded
     */
    forceReload?: () => void;
}
