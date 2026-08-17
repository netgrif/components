import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';
import {BooleanOperator} from '../../boolean-operator';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';
import {NotEquals} from '../../operator/not-equals';
import {Categories} from '../categories';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {ResourceTypeQueryPrefix} from "../resource-type-query-prefix";
import {SimpleExpression} from "../../../../pfql/model/simple-expression";
import {filter, take} from "rxjs/operators";
import {SearchAutocompleteOption} from "../search-autocomplete-option";
import {SearchInputType} from "../search-input-type";

export class TaskProcess extends NoConfigurationAutocompleteCategory<string> {

    private static readonly _i18n = 'search.category.task.process';

    private _allowedNetsSub: Subscription;
    private _destroyed: boolean;

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['processId'],
            [operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${TaskProcess._i18n}.name`,
            logger,
            operators,
            ResourceTypeQueryPrefix.TASKS);
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
                this.addToMap(petriNet.title, petriNet.stringId);
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
            let selectedOption: SearchAutocompleteOption<string[]> | undefined;
            for (const option of options) {
                if (option.value.some(netId => netId === expression.operandValue)) {
                    selectedOption = option;
                    break;
                }
            }
            if (!!selectedOption) {
                this.setOperands([selectedOption] as any);
            }
            isDone$.next();
            isDone$.complete();
        })

        return isDone$.asObservable();
    }

    protected generateQuery(userInput: Array<Array<string>>): Query {
        if (this.selectedOperator.numberOfOperands !== 1) {
            throw new Error('Only unary operators are currently supported by the TaskProcess implementation');
        }
        let operand = userInput[0];
        if (!Array.isArray(operand)) {
            operand = [operand];
        }
        const queries = operand.map(id => this.selectedOperator.createQuery(this.pfqlKeywords, [id]));
        return Query.combineQueries(queries, BooleanOperator.OR).ensurePrefixAndGet(ResourceTypeQueryPrefix.TASKS);
    }

    get inputPlaceholder(): string {
        return `${TaskProcess._i18n}.placeholder`;
    }

    duplicate(): TaskProcess {
        return new TaskProcess(this._operatorService, this._log, this._optionalDependencies);
    }

    serializeClass(): Categories | string {
        return Categories.TASK_PROCESS;
    }
}
