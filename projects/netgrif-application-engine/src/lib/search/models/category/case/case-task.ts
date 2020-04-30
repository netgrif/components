import {AutocompleteCategory} from '../autocomplete-category';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {CaseProcess} from './case-process';
import {Query} from '../../query/query';
import {BooleanOperator} from '../../boolean-operator';

interface NetTaskPair {
    netId: string;
    taskId: string;
}

export class CaseTask extends AutocompleteCategory<NetTaskPair> {

    protected _processCategory: CaseProcess;

    // TODO 30.4.2020 - CaseTask and CaseRole are almost identical, consider making an abstract class with implementation and
    //  extending it for specific details
    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['taskIds'],
            [operators.getOperator(Equals)],
            'search.category.case.task',
            logger);
        this._processCategory = this._optionalDependencies.categoryFactory.get(CaseProcess) as CaseProcess;
        this._processCategory.selectDefaultOperator();
    }

    protected createOptions(): void {
        this._optionsMap = new Map<string, Array<NetTaskPair>>();
        this._optionalDependencies.caseViewService.allowedNets$.subscribe(allowedNets => {
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
            const taskQuery = this._selectedOperator.createQuery(this.elasticKeywords, [pair.taskId]);
            const netQuery = this._processCategory.generatePredicate([pair.netId]).query;
            return Query.combineQueries([taskQuery, netQuery], BooleanOperator.AND);
        });
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

}
