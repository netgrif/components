import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {NotEquals} from '../../operator/not-equals';
import {Net} from '../../../../process/net';
import {NameIdPair} from '../name-id-pair';
import {CaseNetAttributeAutocompleteCategory} from './case-net-attribute-autocomplete-category';
import {Categories} from '../categories';
import {CaseSearch} from './case-search.enum';
import {ResourceTypeQueryPrefix} from "../resource-type-query-prefix";

export class CaseRole extends CaseNetAttributeAutocompleteCategory {

    // todo 2466 impossible in pfql - prec

    private static readonly _i18n = 'search.category.case.role';

    constructor(operators: OperatorService, logger: LoggerService, optionalDependencies: OptionalDependencies) {
        super([CaseSearch.ENABLED_ROLES],
            [operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${CaseRole._i18n}.name`,
            logger,
            operators,
            optionalDependencies,
            ResourceTypeQueryPrefix.CASES);
    }

    protected extractAttributes(petriNet: Net): Array<NameIdPair> {
        return petriNet.roles.map(r => ({id: r.stringId, name: r.name}));
    }

    get inputPlaceholder(): string {
        return `${CaseRole._i18n}.placeholder`;
    }

    duplicate(): CaseRole {
        return new CaseRole(this._operatorService, this._log, this._optionalDependencies);
    }

    serializeClass(): Categories | string {
        return Categories.CASE_ROLE;
    }
}
