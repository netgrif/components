import {AutocompleteCategory} from './autocomplete-category';
import {Operator} from '../operator/operator';
import {LoggerService} from '../../../logger/services/logger.service';
import {Observable, of} from 'rxjs';
import {SearchInputType} from './search-input-type';
import {FormControl} from '@angular/forms';

/**
 * A utility class that exists for inheritance by simpler category instances.
 *
 * The only configuration input is an [OPERATOR]{@link SearchInputType#OPERATOR} and a `FormControl` instance is available for it as well.
 *
 * For regular [Categories]{@link Category} use {@link NoConfigurationCategory} instead.
 */
export abstract class NoConfigurationAutocompleteCategory<T> extends AutocompleteCategory<T> {

    protected constructor(elasticKeywords: Array<string>, allowedOperators: Array<Operator<any>>,
                          translationPath: string, log: LoggerService) {
        super(elasticKeywords, allowedOperators, translationPath, log);
    }

    /**
     * Always returns an array with only the [OPERATOR]{@link SearchInputType#OPERATOR} constant.
     */
    get configurationInputs$(): Observable<Array<SearchInputType>> {
        return of([SearchInputType.OPERATOR]);
    }

    getActiveInputFormControl(inputIndex: number): FormControl {
        if (inputIndex === 0) {
            return this._operatorFormControl;
        }
        throw new Error(`Illegal inputIndex '${inputIndex}'. This category has only one configuration input!`);
    }

    /**
     * Always throws an error.
     */
    getFilteredAutocompleteConfigurationOptions(inputIndex: number): never {
        throw new Error('NoConfigurationAutocompleteCategory has no configuration options!');
    }
}
