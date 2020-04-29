/**
 * Represents one item in a search autocomplete category options list.
 *
 * See {@link AutocompleteCategory}.
 */
export interface SearchAutocompleteOption {
    /**
     * Text that is displayed to the user
     */
    text: string;
    /**
     * Value of the option, that is used to generate the queries.
     */
    value: any;
}
