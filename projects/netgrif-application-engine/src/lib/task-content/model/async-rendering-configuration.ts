
export interface AsyncRenderingConfiguration {
    /**
     * How many items are rendered at once
     */
    batchSize: number;
    /**
     * What is the delay between renders in milliseconds
     */
    batchDelay: number;
    /**
     * How many placeholder elements are rendered after the items
     */
    numberOfPlaceholders: number;
    /**
     * Whether the data fields should be rendered asynchronously or not
     */
    enableAsyncRendering: boolean;
}
