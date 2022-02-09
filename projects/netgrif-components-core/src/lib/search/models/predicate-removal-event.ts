/**
 * Holds information about a search predicate removal
 */
export interface PredicateRemovalEvent {
    /**
     * Index of the removed predicate
     */
    index: number;
    /**
     * Whether the corresponding search input should be cleared
     */
    clearInput: boolean;
}
