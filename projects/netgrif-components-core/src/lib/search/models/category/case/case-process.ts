import {Query} from '../../query/query';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {BooleanOperator} from '../../boolean-operator';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';
import {NotEquals} from '../../operator/not-equals';
import {Categories} from '../categories';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {CaseSearch} from './case-search.enum';
import {ResourceTypeQueryPrefix} from "../resource-type-query-prefix";
import {take, filter} from "rxjs/operators";
import {SimpleExpression} from "../../../../pfql/model/simple-expression";
import {SearchInputType} from "../search-input-type";

export class CaseProcess extends NoConfigurationAutocompleteCategory<string> {

    private static readonly _i18n = 'search.category.case.process';

    protected _uniqueOptionsMap: Map<string, Set<string>>;
    private _allowedNetsSub: Subscription;
    private _destroyed: boolean;

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super([CaseSearch.PROCESS_IDENTIFIER],
            [operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${CaseProcess._i18n}.name`,
            logger,
            operators,
            ResourceTypeQueryPrefix.CASES);
        this._uniqueOptionsMap = new Map<string, Set<string>>();
        if (!!this._optionalDependencies.ignoreNetsOnAutocompleteCategories) {
            this.inputType = SearchInputType.TEXT;
        }
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

    public override loadFromPfqlExpression(expression: SimpleExpression): Observable<void> {
        if (!this.selectOperatorFromPfqlExpression(expression)) {
            return of(undefined);
        }
        const isDone$ = new Subject<void>();
        this._options$.pipe(
            filter(options => options.length > 0),
            take(1)
        ).subscribe(options => {
            const found = options.find(option => option.value.includes(expression.operandValue));
            if (found) {
                this.setOperands([found] as any);
            }
            isDone$.next();
            isDone$.complete();
        });
        return isDone$.asObservable();
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

    protected generateQuery(userInput: Array<Array<string> | string>): Query {
        if (this.selectedOperator.numberOfOperands !== 1) {
            throw new Error('Only unary operators are currently supported by the CaseProcess implementation');
        }
        let operand = userInput[0];
        if (!Array.isArray(operand)) {
           operand = [operand];
        }
        const queries = operand.map(id => this.selectedOperator.createQuery(this.pfqlKeywords, [id]));
        return Query.combineQueries(queries, BooleanOperator.OR).addPrefixAndGet(ResourceTypeQueryPrefix.CASES);
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
