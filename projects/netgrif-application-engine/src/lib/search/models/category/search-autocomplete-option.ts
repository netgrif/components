/**
 * Represents one item in a search autocomplete category options list.
 *
 * See {@link AutocompleteCategory}.
 */
export interface SearchAutocompleteOption<T> {
    /**
     * Text that is displayed to the user
     */
    text: string;
    /**
     * Value of the option, that is used to generate the queries.
     */
    value: T;
    /**
     * The Material design icon that should be displayed next to the option. No icon will be displayed if no icon is provided.
     *
     * See [material website]{@link https://material.io/resources/icons} for supported icon list.
     */
    icon?: string;
}
