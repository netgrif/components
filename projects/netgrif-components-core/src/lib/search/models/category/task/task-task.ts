import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';
import {TaskNetAttributeAutocompleteCategory} from './task-net-attribute-autocomplete-category';
import {Net} from '../../../../process/net';
import {NameIdPair} from '../name-id-pair';
import {Categories} from '../categories';
import {ResourceTypeQueryPrefix} from "../resource-type-query-prefix";
import {SimpleExpression} from "../../../../pfql/model/simple-expression";
import {Observable, of} from "rxjs";
import {filter, take, map} from "rxjs/operators";
import {NetAttributePair} from "../net-attribute-pair";
import {SearchAutocompleteOption} from "../search-autocomplete-option";
import {SearchInputType} from "../search-input-type";


export class TaskTask extends TaskNetAttributeAutocompleteCategory {

    private static readonly _i18n = 'search.category.task.task';

    constructor(operators: OperatorService, logger: LoggerService, optionalDependencies: OptionalDependencies) {
        super(['transitionId'],
            [operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${TaskTask._i18n}.name`,
            logger,
            operators,
            optionalDependencies,
            ResourceTypeQueryPrefix.TASKS);
        if (!!this._optionalDependencies.ignoreNetsOnAutocompleteCategories) {
            this.inputType = SearchInputType.TEXT;
        }
    }

    protected extractAttributes(petriNet: Net): Array<NameIdPair> {
        return petriNet.transitions.map(t => ({id: t.stringId, name: t.title}));
    }

    public override loadFromPfqlExpression(expression: SimpleExpression): Observable<void> {
        if (!this.selectOperatorFromPfqlExpression(expression)) {
            return of(undefined);
        }
        if (this._optionalDependencies.ignoreNetsOnAutocompleteCategories) {
            this.setOperands([expression.operandValue]);
            return of(undefined);
        }
        return this._options$.pipe(
            filter(options => options.length > 0),
            take(1),
            map(options => {
                let selectedOption: SearchAutocompleteOption<NetAttributePair[]> | undefined;
                for (const option of options) {
                    if (option.value.some(pair => pair.attributeId === expression.operandValue)) {
                        selectedOption = option;
                        break;
                    }
                }
                if (!!selectedOption) {
                    this.setOperands([selectedOption] as any);
                }
            })
        );
    }

    get inputPlaceholder(): string {
        return `${TaskTask._i18n}.placeholder`;
    }

    duplicate(): TaskTask {
        return new TaskTask(this._operatorService, this._log, this._optionalDependencies);
    }

    serializeClass(): Categories | string {
        return Categories.TASK_TASK;
    }
}
