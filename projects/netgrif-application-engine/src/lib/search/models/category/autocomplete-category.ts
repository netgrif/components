import {Category} from './category';
import {Operator} from '../operator/operator';
import {LoggerService} from '../../../logger/services/logger.service';
import {SearchInputType} from './search-input-type';
import {SearchAutocompleteOption} from './search-autocomplete-option';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

/**
 * Represents a Search Category whose values are a known set. The value selection is done with an autocomplete field.
 *
 * @typeparam T type of the object that the autocomplete option values use and in turn is used to generate queries
 */
export abstract class AutocompleteCategory<T> extends Category<T> {

    /**
     * Autocomplete categories usually require a map to represent mapping of display names
     * of their options to objects that are needed to construct their queries.
     *
     * You are not required to use this map when you implement your own Category,
     * but it comes with helpful functions and might save you some time.
     *
     * See [options()]{@link AutocompleteCategory#options} and [addToMap()]{@link AutocompleteCategory#addToMap}.
     */
    protected _optionsMap: Map<string, Array<T>>;

    protected constructor(elasticKeywords: Array<string>,
                          allowedOperators: Array<Operator<any>>,
                          translationPath: string,
                          log: LoggerService) {
        super(elasticKeywords, allowedOperators, translationPath, SearchInputType.AUTOCOMPLETE, log);
        this._optionsMap = new Map<string, Array<T>>();
        // timeout is used to bypass javascript object initialization bugs.
        // Injected properties of inherited classes were not set in the function call.
        setTimeout(() => {
            this.createOptions();
        });
    }

    /**
     * Options the user can select from for this search Category.
     *
     * The default implementation iterates trough the [_optionsMap]{@link AutocompleteCategory#_optionsMap} and
     * creates options with the keys as [text]{@link SearchAutocompleteOption#text}
     * and values as [value]{@link SearchAutocompleteOption#value}.
     */
    public get options(): Array<SearchAutocompleteOption> {
        const result = [];
        for (const entry of this._optionsMap.entries()) {
            result.push({text: entry[0], value: entry[1]});
        }
        return result;
    }

    /**
     * Populates the [_options]{@link AutocompleteCategory#_options} field with options for this category.
     *
     * You must call this method yourself in an appropriate place of Category creation.
     */
    protected abstract createOptions(): void;

    /**
     * The function that is used to filter shown options in the autocomplete field.
     *
     * By default the options that start with the input string are returned (case insensitive).
     * @param userInput user search input
     * @returns options that satisfy the autocomplete condition
     */
    public filterOptions(userInput: Observable<string | SearchAutocompleteOption>): Observable<Array<SearchAutocompleteOption>> {
        return userInput.pipe(
            startWith(''),
            map(input => {
                let value;
                if (typeof input === 'string') {
                    value = input.toLocaleLowerCase();
                } else {
                    value = input.text;
                }
                return this.options.filter(option => option.text.toLocaleLowerCase().startsWith(value));
            })
        );
    }

    /**
     * Adds a new entry or pushes value into an existing entry.
     * When a new entry is created, it is created as an Array of one element.
     * @param key where in the map should the value be added
     * @param value the value that should be added to the map
     */
    protected addToMap(key: any, value: T): void {
        if (this._optionsMap.has(key)) {
            this._optionsMap.get(key).push(value);
        } else {
            this._optionsMap.set(key, [value]);
        }
    }

    protected isOperandValueSelected(newValue: SearchAutocompleteOption | string): boolean {
        return !(!newValue || typeof newValue === 'string');
    }

    /**
     * Performs a transformation of the `FormControl` value before passing it into the selected `Operator` for query generation.
     * It is mostly useful only for AutocompleteCategories, where the selected value of the FormControl is an object.
     *
     * The default AutocompleteCategory implementation returns the {@link SearchAutocompleteOption} `value` attribute.
     * @param value the FormControlValue
     * @returns the value used for query generation
     */
    protected transformCategoryValue(value: SearchAutocompleteOption): T {
        return value.value;
    }
}
