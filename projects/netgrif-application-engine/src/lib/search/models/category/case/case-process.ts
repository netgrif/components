import {AutocompleteCategory} from '../autocomplete-category';
import {Query} from '../../query/query';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {SearchAutocompleteOption} from '../search-autocomplete-option';
import {CaseViewService} from '../../../../view/case-view/case-view-service';
import {BooleanOperator} from '../../boolean-operator';

export class CaseProcess extends AutocompleteCategory {

    private _nameToIds: Map<string, Array<string>>;

    constructor(operators: OperatorService, logger: LoggerService, protected _caseViewService: CaseViewService) {
        super(['processId'],
            [operators.getOperator(Equals)],
            'search.category.case.process',
            logger);
        this.createOptions();
    }

    get options(): Array<SearchAutocompleteOption> {
        const result = [];
        for (const entry of this._nameToIds.entries()) {
            result.push({text: entry[0], value: entry[1]});
        }
        return result;
    }

    protected createOptions(): void {
        this._nameToIds = new Map<string, Array<string>>();
        this._caseViewService.allowedNets$.subscribe( allowedNets => {
            allowedNets.forEach( petriNet => {
                if (this._nameToIds.has(petriNet.title)) {
                    this._nameToIds.get(petriNet.title).push(petriNet.stringId);
                } else {
                    this._nameToIds.set(petriNet.title, [petriNet.stringId]);
                }
            });
        });
    }

    generateQuery(processIds: Array<string>): Query {
        const queries = processIds.map( id => this._selectedOperator.createQuery(this.elasticKeywords, [id]));
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

}
