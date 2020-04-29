import {Category} from './category';
import {Operator} from '../operator/operator';
import {LoggerService} from '../../../logger/services/logger.service';
import {SearchInputType} from './search-input-type';
import {SearchAutocompleteOption} from './search-autocomplete-option';

/**
 * Represents a Search Category whose values are a known set. The value selection is done with an autocomplete field.
 */
export abstract class AutocompleteCategory extends Category {

    protected constructor(elasticKeywords: Array<string>,
                          allowedOperators: Array<Operator>,
                          translationPath: string,
                          log: LoggerService) {
        super(elasticKeywords, allowedOperators, translationPath, SearchInputType.AUTOCOMPLETE, log);
        this.createOptions();
    }

    /**
     * Options the user can select from for this search Category.
     */
    public abstract get options(): Array<SearchAutocompleteOption>;

    /**
     * Populates the [_options]{@link AutocompleteCategory#_options} field with options for this category.
     */
    protected abstract createOptions(): void;

    /**
     * The function that is used to filter shown options in the autocomplete field.
     *
     * By default the options that start with the input string are returned (case insensitive).
     * @param userInput user search input
     * @returns options that satisfy the autocomplete condition
     */
    public filterOptions(userInput: string): Array<SearchAutocompleteOption> {
        const value = userInput.toLocaleLowerCase();
        return this.options.filter(option => option.text.toLocaleLowerCase().startsWith(value));
    }
}
