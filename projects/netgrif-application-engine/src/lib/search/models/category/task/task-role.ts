import {NetRolePair} from '../net-role-pair';
import {TaskProcess} from './task-process';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';
import {BooleanOperator} from '../../boolean-operator';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';

export class TaskRole extends NoConfigurationAutocompleteCategory<NetRolePair> {

    private static readonly _i18n = 'search.category.task.role';
    protected _processCategory: TaskProcess;

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['roles'],
            [operators.getOperator(Equals)],
            `${TaskRole._i18n}.name`,
            logger);
        this._processCategory = this._optionalDependencies.categoryFactory.get(TaskProcess) as TaskProcess;
        this._processCategory.selectDefaultOperator();
    }

    protected createOptions(): void {
        this._optionalDependencies.taskViewService.allowedNets$.subscribe(allowedNets => {
            allowedNets.forEach(petriNet => {
                petriNet.roles.forEach(processRole => {
                    this.addToMap(processRole.name, {
                        netId: petriNet.stringId,
                        roleId: processRole.stringId
                    });
                });
            });
        });
    }

    protected generateQuery(userInput: Array<NetRolePair>): Query {
        const queries = userInput.map(pair => {
            const roleQuery = this._selectedOperator.createQuery(this.elasticKeywords, [pair.roleId]);
            const netQuery = this._processCategory.generatePredicate([pair.netId]).query;
            return Query.combineQueries([roleQuery, netQuery], BooleanOperator.AND);
        });
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

    get inputPlaceholder(): string {
        return `${TaskRole._i18n}.placeholder`;
    }
}
