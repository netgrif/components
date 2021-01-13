import {NetTaskPair} from '../net-task-pair';
import {TaskProcess} from './task-process';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';
import {BooleanOperator} from '../../boolean-operator';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';


export class TaskTask extends NoConfigurationAutocompleteCategory<NetTaskPair> {

    private static readonly _i18n = 'search.category.task.task';
    protected _processCategory: TaskProcess;

    constructor(protected _operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['transitionId'],
            [_operators.getOperator(Equals)],
            `${TaskTask._i18n}.name`,
            logger);
        this._processCategory = this._optionalDependencies.categoryFactory.get(TaskProcess) as TaskProcess;
        this._processCategory.selectDefaultOperator();
    }

    protected createOptions(): void {
        this._optionalDependencies.taskViewService.allowedNets$.subscribe(allowedNets => {
            allowedNets.forEach(petriNet => {
                petriNet.transitions.forEach(transition => {
                    this.addToMap(transition.title, {
                        netId: petriNet.stringId,
                        taskId: transition.stringId
                    });
                });
            });
        });
    }

    protected generateQuery(userInput: Array<NetTaskPair>): Query {
        const queries = userInput.map(pair => {
            const taskQuery = this.selectedOperator.createQuery(this.elasticKeywords, [pair.taskId]);
            const netQuery = this._processCategory.generatePredicate([pair.netId]).query;
            return Query.combineQueries([taskQuery, netQuery], BooleanOperator.AND);
        });
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

    get inputPlaceholder(): string {
        return `${TaskTask._i18n}.placeholder`;
    }

    duplicate(): TaskTask {
        return new TaskTask(this._operators, this._log, this._optionalDependencies);
    }
}
