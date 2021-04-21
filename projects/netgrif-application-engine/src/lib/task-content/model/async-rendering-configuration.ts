
export interface AsyncRenderingConfiguration {
    /**
     * How many items are rendered at once
     */
    batchSize?: number;
    /**
     * What is the delay between renders in milliseconds
     */
    batchDelay?: number;
    /**
     * How many placeholder elements are rendered after the items
     */
    numberOfPlaceholders?: number;
    /**
     * Whether data fields that are not yet present in the task content should be rendered asynchronously or not
     */
    enableAsyncRenderingForNewFields?: boolean;
    /**
     * Whether all data fields that are already loaded, when a task is expanded should be rendered asynchronously or not
     */
    enableAsyncRenderingOnTaskExpand?: boolean;
}
