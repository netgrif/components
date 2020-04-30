import {AutocompleteCategory} from '../autocomplete-category';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {CaseProcess} from './case-process';
import {BooleanOperator} from '../../boolean-operator';

interface NetRolePair {
    netId: string;
    roleId: string;
}

export class CaseRole extends AutocompleteCategory<NetRolePair> {

    protected _processCategory: CaseProcess;

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['enabledRoles'],
            [operators.getOperator(Equals)],
            'search.category.case.role',
            logger);
        this._processCategory = this._optionalDependencies.categoryFactory.get(CaseProcess) as CaseProcess;
        this._processCategory.selectDefaultOperator();
    }

    protected createOptions(): void {
        this._optionsMap = new Map<string, Array<NetRolePair>>();
        this._optionalDependencies.caseViewService.allowedNets$.subscribe(allowedNets => {
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
}
