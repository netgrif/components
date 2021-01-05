import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';
import {BooleanOperator} from '../../boolean-operator';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';

export class TaskProcess extends NoConfigurationAutocompleteCategory<string> {

    private static readonly _i18n = 'search.category.task.process';

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['processId'],
            [operators.getOperator(Equals)],
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

    protected generateQuery(userInput: Array<string>): Query {
        const queries = userInput.map(id => this.selectedOperator.createQuery(this.elasticKeywords, [id]));
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

    get inputPlaceholder(): string {
        return `${TaskProcess._i18n}.placeholder`;
    }
}
