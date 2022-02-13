/**
 * Interface used for extraction of net attributes by {@link NetAttributeAutocompleteCategory} implementations.
 */
export interface NameIdPair {
    /**
     * Display name of the attribute
     */
    name: string;
    /**
     * Unique id of the attribute, that is used for searching
     */
    id: string;
}
