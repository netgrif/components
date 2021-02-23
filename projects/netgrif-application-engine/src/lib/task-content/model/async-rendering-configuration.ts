
export interface AsyncRenderingConfiguration {
    /**
     * How many items are rendered at once
     */
    batchSize: number;
    /**
     * What is the delay between renders in milliseconds
     */
    batchDelay: number;
}
