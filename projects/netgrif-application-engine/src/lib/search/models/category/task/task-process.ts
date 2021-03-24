import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';
import {BooleanOperator} from '../../boolean-operator';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';
import {NotEquals} from '../../operator/not-equals';

export class TaskProcess extends NoConfigurationAutocompleteCategory<string> {

    private static readonly _i18n = 'search.category.task.process';

    constructor(protected _operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['processId'],
            [_operators.getOperator(Equals), _operators.getOperator(NotEquals)],
            `${TaskProcess._i18n}.name`,
            logger);
    }

    protected createOptions(): void {
        this._optionalDependencies.taskViewService.allowedNets$.subscribe(allowedNets => {
            allowedNets.forEach(petriNet => {
                this.addToMap(petriNet.title, petriNet.stringId);
            });
        });
    }

    protected generateQuery(userInput: Array<Array<string>>): Query {
        if (this.selectedOperator.numberOfOperands !== 1) {
            throw new Error('Only unary operators are currently supported by the TaskProcess implementation');
        }
        const operand = userInput[0];
        const queries = operand.map(id => this.selectedOperator.createQuery(this.elasticKeywords, [id]));
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

    get inputPlaceholder(): string {
        return `${TaskProcess._i18n}.placeholder`;
    }

    duplicate(): TaskProcess {
        return new TaskProcess(this._operators, this._log, this._optionalDependencies);
    }
}
