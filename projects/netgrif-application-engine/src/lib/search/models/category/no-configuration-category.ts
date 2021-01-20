import {Category} from './category';
import {Operator} from '../operator/operator';
import {SearchInputType} from './search-input-type';
import {LoggerService} from '../../../logger/services/logger.service';
import {Observable, of} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ConfigurationInput} from '../configuration-input';

/**
 * A utility class that exists for inheritance by simpler category instances.
 *
 * The only configuration input is an [OPERATOR]{@link SearchInputType#OPERATOR} and a `FormControl` instance is available for it as well.
 *
 * For [AutocompleteCategories]{@link AutocompleteCategory} use {@link NoConfigurationAutocompleteCategory} instead.
 */
export abstract class NoConfigurationCategory<T> extends Category<T> {

    protected constructor(elasticKeywords: Array<string>, allowedOperators: Array<Operator<any>>,
                          translationPath: string, inputType: SearchInputType, log: LoggerService) {
        super(elasticKeywords, allowedOperators, translationPath, inputType, log);
    }

    /**
     * Always returns an array with only the [OPERATOR]{@link SearchInputType#OPERATOR} constant.
     */
    get configurationInputs$(): Observable<Array<ConfigurationInput>> {
        return of([this._OPERATOR_INPUT]);
    }

    /**
     * @returns No configuration categories are displayed with bold text
     */
    get displayBold(): boolean {
        return true;
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
    // @ts-ignore
    getFilteredAutocompleteConfigurationOptions(inputIndex: number): never {
        this.throwNoConfigurationError();
    }

    /**
     * Always throws an error.
     */
    // @ts-ignore
    isAutocompleteConfigurationSelected(inputIndex: number): never {
        this.throwNoConfigurationError();
    }

    /**
     * Always throws an error.
     */
    // @ts-ignore
    isAutocompleteConfigurationDisplayBold(inputIndex: number): never {
        this.throwNoConfigurationError();
    }

    /**
     * Always throws an error.
     */
    // @ts-ignore
    getAutocompleteConfigurationSelectedOptionTranslatePath(inputIndex: number): never {
        this.throwNoConfigurationError();
    }

    /**
     * Always throws an error.
     */
    // @ts-ignore
    clearAutocompleteConfigurationInput(inputIndex: number): never {
        this.throwNoConfigurationError();
    }

    protected isOperandValueSelected(newValue: any): boolean {
        return !!newValue;
    }

    private throwNoConfigurationError(): never {
        throw new Error('NoConfigurationCategory has no configuration options!');
    }
}
