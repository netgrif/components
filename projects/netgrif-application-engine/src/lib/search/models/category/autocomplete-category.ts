import {Category} from './category';
import {Operator} from '../operator/operator';
import {LoggerService} from '../../../logger/services/logger.service';
import {SearchInputType} from './search-input-type';
import {SearchAutocompleteOption} from './search-autocomplete-option';
import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from 'rxjs';
import {filter, map, startWith, take} from 'rxjs/operators';
import {AutocompleteOptions} from './autocomplete-options';
import {FormControl} from '@angular/forms';
import {OperatorService} from '../../operator-service/operator.service';

/**
 * Represents a Search Category whose values are a known set. The value selection is done with an autocomplete field.
 *
 * @typeparam T type of the object that the autocomplete option values use and in turn is used to generate queries
 */
export abstract class AutocompleteCategory<T> extends Category<Array<T>> implements AutocompleteOptions {

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

    protected _options$: BehaviorSubject<Array<SearchAutocompleteOption<Array<T>>>>;

    private readonly _timeoutId: number;

    protected constructor(elasticKeywords: Array<string>,
                          allowedOperators: Array<Operator<any>>,
                          translationPath: string,
                          log: LoggerService,
                          operatorService: OperatorService) {
        super(elasticKeywords, allowedOperators, translationPath, SearchInputType.AUTOCOMPLETE, log, operatorService);
        this._optionsMap = new Map<string, Array<T>>();
        this._options$ = new BehaviorSubject<Array<SearchAutocompleteOption<Array<T>>>>([]);
        // timeout is used to bypass javascript object initialization bugs.
        // Injected properties of inherited classes were not set in the function call.
        this._timeoutId = setTimeout(() => {
            this.createOptions();
        });
    }

    destroy() {
        super.destroy();
        this._options$.complete();
        clearTimeout(this._timeoutId);
    }

    /**
     * Options the user can select from for this search Category.
     */
    public get options(): Array<SearchAutocompleteOption<Array<T>>> {
        return this._options$.value;
    }

    /**
     * An Observable of the options the user can select from for this search Category.
     *
     * The Observable is updated when the base set of options changes, not when the available options are
     * filtered, see [filterOptions()]{@link AutocompleteCategory#filterOptions}.
     *
     * The Observable initially contains an empty array and the options may appear at a later point in time
     * (based on the concrete AutocompleteCategory subclass implementation)
     */
    public get options$(): Observable<Array<SearchAutocompleteOption<Array<T>>>> {
        return this._options$.asObservable();
    }

    /**
     * Publishes a new value in the [_options$]{@link AutocompleteCategory#_options$} Subject generated from the
     * [_optionsMap]{@link AutocompleteCategory#_optionsMap}.
     *
     * The default implementation iterates trough the [_optionsMap]{@link AutocompleteCategory#_optionsMap} and
     * creates options with the keys as [text]{@link SearchAutocompleteOption#text}
     * and values as [value]{@link SearchAutocompleteOption#value}.
     */
    protected updateOptions(): void {
        const result = [];
        for (const entry of this._optionsMap.entries()) {
            result.push(this.createSearchAutocompleteOption(entry[0], entry[1]));
        }
        this._options$.next(result);
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
     *
     * By default a new value is emitted, whenever either the user input or the base set of options changes.
     * @param userInput user search input
     * @returns options that satisfy the autocomplete condition
     */
    public filterOptions(userInput: Observable<string | SearchAutocompleteOption<Array<T>>>):
        Observable<Array<SearchAutocompleteOption<Array<T>>>> {
        return combineLatest([
            userInput.pipe(
                startWith(''),
                map(input => typeof input === 'string' ? input.toLocaleLowerCase() : input.text)
            ),
            this.options$
        ]).pipe(
            map(([input, options]) => {
                return options.filter(o => o.text.toLocaleLowerCase().startsWith(input));
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
        const option = this._optionsMap.get(key);
        if (option !== undefined) {
            option.push(value);
        } else {
            this._optionsMap.set(key, [value]);
        }
    }

    protected isOperandValueSelected(newValue: SearchAutocompleteOption<Array<T>> | string): boolean {
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
    protected transformCategoryValue(value: SearchAutocompleteOption<Array<T>>): Array<T> {
        return value.value;
    }

    protected serializeOperandValue(valueFormControl: FormControl): unknown {
        return (valueFormControl.value as SearchAutocompleteOption<unknown>).text;
    }

    /**
     * @param text the serialized output of the [serializeOperandValue()]{@link Category#serializeOperandValue} method
     * @returns the deserialized value, that can be set as FormControl value
     *
     * This method throws na error if the serialized value is not one of the autocomplete options.
     */
    protected deserializeOperandValue(text: unknown): Observable<any> {
        const result$ = new ReplaySubject(1);
        this.options$.pipe(filter(o => o.length > 0), take(1)).subscribe(() => {
            const value = this._optionsMap.get(text as string);
            if (value === undefined) {
                throw new Error(`The serialized autocomplete value '${value
                }' does not map to any autocomplete options and cannot be deserialized!`);
            }
            result$.next(this.createSearchAutocompleteOption(text as string, value));
            result$.complete();
        });
        return result$.asObservable();
    }

    protected createSearchAutocompleteOption(text: string, value: Array<T>): SearchAutocompleteOption<Array<T>> {
        return {text, value};
    }
}
