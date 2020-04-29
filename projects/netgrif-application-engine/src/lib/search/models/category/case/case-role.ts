import {AutocompleteCategory} from '../autocomplete-category';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {CaseViewService} from '../../../../view/case-view/case-view-service';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';

interface NetRolePair {
    netId: string;
    roleId: string;
}

export class CaseRole extends AutocompleteCategory<NetRolePair> {

    constructor(operators: OperatorService, logger: LoggerService, protected _caseViewService: CaseViewService) {
        super(['enabledRoles'],
            [operators.getOperator(Equals)],
            'search.category.case.role',
            logger);
    }

    protected createOptions(): void {
        this._optionsMap = new Map<string, Array<NetRolePair>>();
        this._caseViewService.allowedNets$.subscribe(allowedNets => {
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

    public generateQuery(netRolePairs: Array<NetRolePair>): Query {

    }
}
