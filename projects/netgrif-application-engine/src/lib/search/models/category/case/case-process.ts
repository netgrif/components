import {AutocompleteCategory} from '../autocomplete-category';
import {Query} from '../../query/query';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {BooleanOperator} from '../../boolean-operator';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';

export class CaseProcess extends AutocompleteCategory<string> {

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['processId'],
            [operators.getOperator(Equals)],
            'search.category.case.process',
            logger);
    }

    protected createOptions(): void {
        this._optionsMap = new Map<string, Array<string>>();
        this._optionalDependencies.caseViewService.allowedNets$.subscribe(allowedNets => {
            allowedNets.forEach(petriNet => {
                this.addToMap(petriNet.title, petriNet.stringId);
            });
        });
    }

    protected generateQuery(userInput: Array<string>): Query {
        const queries = userInput.map(id => this._selectedOperator.createQuery(this.elasticKeywords, [id]));
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

}
