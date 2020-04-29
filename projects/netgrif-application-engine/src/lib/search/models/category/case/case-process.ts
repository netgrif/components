import {AutocompleteCategory} from '../autocomplete-category';
import {Query} from '../../query/query';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {CaseViewService} from '../../../../view/case-view/case-view-service';
import {BooleanOperator} from '../../boolean-operator';

export class CaseProcess extends AutocompleteCategory<string> {

    constructor(operators: OperatorService, logger: LoggerService, protected _caseViewService: CaseViewService) {
        super(['processId'],
            [operators.getOperator(Equals)],
            'search.category.case.process',
            logger);
    }

    protected createOptions(): void {
        this._optionsMap = new Map<string, Array<string>>();
        this._caseViewService.allowedNets$.subscribe(allowedNets => {
            allowedNets.forEach(petriNet => {
                this.addToMap(petriNet.title, petriNet.stringId);
            });
        });
    }

    public generateQuery(processIds: Array<string>): Query {
        const queries = processIds.map(id => this._selectedOperator.createQuery(this.elasticKeywords, [id]));
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

}
