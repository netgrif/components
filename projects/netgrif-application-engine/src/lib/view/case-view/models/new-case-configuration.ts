export interface NewCaseConfiguration {
    /**
     * Whether the process cache should be used when creating new cases or not.
     *
     * Disabling the cache can have detrimental effect on the performance of the application but will result
     * in a very small window in which the process metadata can be desynchronized between frontend and backend.
     */
    useCachedProcesses: boolean;
}
