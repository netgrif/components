import {SearchAutocompleteOption} from './search-autocomplete-option';
import {Observable} from 'rxjs';


/**
 * Not all categories that provide autocomplete options want to necessarily extend the {@link AutocompleteCategory} class, since it
 * imposes some implementation specifications.
 *
 * All categories with autocomplete options should implement this interface, as the GUI expects the specified behavior to be available.
 */
export interface AutocompleteOptions {
    /**
     * The function that is used to filter shown options in the autocomplete field.
     *
     * @param userInput user search input
     * @returns options that satisfy the autocomplete condition
     */
    filterOptions(userInput: Observable<string | SearchAutocompleteOption<unknown>>): Observable<Array<SearchAutocompleteOption<unknown>>>;
}
