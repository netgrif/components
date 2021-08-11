import {Query} from '../../query/query';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {BooleanOperator} from '../../boolean-operator';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';
import {NotEquals} from '../../operator/not-equals';
import {Categories} from '../categories';
import {Subscription} from 'rxjs';

export class CaseProcess extends NoConfigurationAutocompleteCategory<string> {

    private static readonly _i18n = 'search.category.case.process';

    protected _uniqueOptionsMap: Map<string, Set<string>>;
    private _allowedNetsSub: Subscription;
    private _destroyed: boolean;

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['processIdentifier'],
            [operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${CaseProcess._i18n}.name`,
            logger,
            operators);
        this._uniqueOptionsMap = new Map<string, Set<string>>();
    }

    destroy() {
        super.destroy();
        if (this._allowedNetsSub && !this._allowedNetsSub.closed) {
            this._allowedNetsSub.unsubscribe();
        }
        this._destroyed = true;
    }

    protected createOptions(): void {
        if (this._destroyed) {
            return;
        }

        this._allowedNetsSub = this._optionalDependencies.allowedNetsService.allowedNets$.subscribe(allowedNets => {
            this._optionsMap.clear();
            allowedNets.forEach(petriNet => {
                if (this.isUniqueOption(petriNet.title, petriNet.identifier)) {
                    this.addToMap(petriNet.title, petriNet.identifier);
                }
            });
            this.updateOptions();
        });
    }

    /**
     * Checks whether the provided option is unique and updates the list of unique options with it.
     * @param key autocomplete option key
     * @param value autocomplete option value
     * @returns `true` if the option has not yet been checked as unique. `false` if the option has been checked before.
     */
    protected isUniqueOption(key: string, value: string): boolean {
        if (!this._uniqueOptionsMap.has(key)) {
            this._uniqueOptionsMap.set(key, new Set<string>([value]));
            return true;
        }
        if (this._uniqueOptionsMap.get(key).has(value)) {
            return false;
        } else {
            this._uniqueOptionsMap.get(key).add(value);
            return true;
        }
    }

    protected generateQuery(userInput: Array<Array<string>>): Query {
        if (this.selectedOperator.numberOfOperands !== 1) {
            throw new Error('Only unary operators are currently supported by the CaseProcess implementation');
        }
        const operand = userInput[0];
        const queries = operand.map(id => this.selectedOperator.createQuery(this.elasticKeywords, [id]));
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

    get inputPlaceholder(): string {
        return `${CaseProcess._i18n}.placeholder`;
    }

    duplicate(): CaseProcess {
        return new CaseProcess(this._operatorService, this._log, this._optionalDependencies);
    }

    serializeClass(): Categories | string {
        return Categories.CASE_PROCESS;
    }
}
