/** Configures how many header columns can participate in sorting. */
export enum HeaderSortingMode {
    /** Only the most recently selected column is sorted in every header mode. */
    SINGLE = 'single',

    /** Multiple columns can be sorted; their selection order defines their sorting priority. */
    MULTI = 'multi',

    /** Multiple columns can be configured in edit mode, while normal sort mode selects only one column. */
    COMBINED = 'combined'
}
