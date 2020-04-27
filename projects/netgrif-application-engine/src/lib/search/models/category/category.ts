import {Operator} from '../operator/operator';
import {LoggerService} from '../../../logger/services/logger.service';

/**
 * THe top level of abstraction in search query generation. Represents a set of indexed fields that can be searched.
 * Holds state information about the query construction process.
 */
export abstract class Category {

    /**
     * The operator that is currently selected for this category. It is used to save state of the search GUI.
     */
    private _selectedOperator: Operator;

    /**
     * @param _elasticKeywords Elasticsearch keywords that should be queried by queries generated with this category
     * @param _allowedOperators Operators that can be used to generated queries on the above keywords
     * @param _log used to record information about incorrect use of this class
     */
    protected constructor(private readonly _elasticKeywords: Array<string>,
                          private readonly _allowedOperators: Array<Operator>,
                          private _log: LoggerService) {
    }

    /**
     * @returns the set of Operators that can be used with this category.
     */
    public get allowedOperators(): Array<Operator> {
        const result = [];
        result.push(...this._allowedOperators);
        return result;
    }

    /**
     * @returns the set of Elasticsearch keywords that should be queried by queries generated with this category.
     * The method can be overridden if the keywords are not static and change based on some additional selection (eg. Data fields)
     */
    protected get elasticKeywords(): Array<string> {
        const result = [];
        result.push(...this._elasticKeywords);
        return result;
    }

    /**
     * Changes the state of the Category. Category can in general create queries once an {@link Operator} is selected.
     * @param operatorIndex index in the [allowedOperators]{@link Category#allowedOperators} array of the {@link Operator} that
     * should be selected
     */
    public selectOperator(operatorIndex: number): void {
        if (operatorIndex < 0 || operatorIndex >= this._allowedOperators.length) {
            this._log.warn(`The provided 'operatorIndex' is out of range.`);
            return;
        }
        this._selectedOperator = this._allowedOperators[operatorIndex];
    }

    /**
     * Resets the state of the Category, deselecting any selected category and removing other state
     * information if the Category defines them.
     */
    public reset(): void {
        this._selectedOperator = undefined;
    }

}
