/**
 * Represents the possible modes of sorting that can be used for a header.
 */
export enum HeaderSortingMode {
    /**
     * Allows sorting by a single column at a time.
     */
    SINGLE = 'single',

    /**
     * Allows sorting by multiple columns independently.
     */
    MULTI = 'multi',

    /**
     * Combines multiple sorting operations into a single effective result.
     */
    COMBINED = 'combined'
}
