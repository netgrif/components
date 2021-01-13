import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {Query} from '../../query/query';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {CaseProcess} from './case-process';
import {BooleanOperator} from '../../boolean-operator';
import {NetRolePair} from '../net-role-pair';
import {NoConfigurationAutocompleteCategory} from '../no-configuration-autocomplete-category';

export class CaseRole extends NoConfigurationAutocompleteCategory<NetRolePair> {

    private static readonly _i18n = 'search.category.case.role';
    protected _processCategory: CaseProcess;

    constructor(protected _operators: OperatorService, logger: LoggerService, protected _optionalDependencies: OptionalDependencies) {
        super(['enabledRoles'],
            [_operators.getOperator(Equals)],
            `${CaseRole._i18n}.name`,
            logger);
        this._processCategory = this._optionalDependencies.categoryFactory.get(CaseProcess) as CaseProcess;
        this._processCategory.selectDefaultOperator();
    }

    protected createOptions(): void {
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
            const roleQuery = this.selectedOperator.createQuery(this.elasticKeywords, [pair.roleId]);
            const netQuery = this._processCategory.generatePredicate([pair.netId]).query;
            return Query.combineQueries([roleQuery, netQuery], BooleanOperator.AND);
        });
        return Query.combineQueries(queries, BooleanOperator.OR);
    }

    get inputPlaceholder(): string {
        return `${CaseRole._i18n}.placeholder`;
    }

    duplicate(): CaseRole {
        return new CaseRole(this._operators, this._log, this._optionalDependencies);
    }
}
