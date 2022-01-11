import {AutocompleteCategory} from './autocomplete-category';
import {Operator} from '../operator/operator';
import {LoggerService} from '../../../logger/services/logger.service';
import {Observable, of} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ConfigurationInput} from '../configuration-input';
import {OperatorService} from '../../operator-service/operator.service';
import {FilterTextSegment} from '../persistance/filter-text-segment';

/**
 * A utility class that exists for inheritance by simpler category instances.
 *
 * The only configuration input is an [OPERATOR]{@link SearchInputType#OPERATOR} and a `FormControl` instance is available for it as well.
 *
 * For regular [Categories]{@link Category} use {@link NoConfigurationCategory} instead.
 */
export abstract class NoConfigurationAutocompleteCategory<T> extends AutocompleteCategory<T> {

    protected constructor(elasticKeywords: Array<string>, allowedOperators: Array<Operator<any>>,
                          translationPath: string, log: LoggerService, operatorService: OperatorService) {
        super(elasticKeywords, allowedOperators, translationPath, log, operatorService);
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

    protected createConfigurationFilterTextSegments(): Array<FilterTextSegment> {
        return [];
    }
}
