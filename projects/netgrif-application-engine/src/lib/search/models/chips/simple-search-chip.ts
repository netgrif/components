/**
 * Stores the data for chips in the simple search GUI.
 *
 * See {@link AbstractSearchComponent} for more information.
 */
export interface SimpleSearchChip {
    /**
     * Text displayed in the chip.
     */
    text: string;
    /**
     * Index of the {@link Predicate} object represented by this chip
     */
    predicateIndex?: number;
}
