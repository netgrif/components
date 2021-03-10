import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {NotEquals} from '../../operator/not-equals';
import {Net} from '../../../../process/net';
import {NameIdPair} from '../name-id-pair';
import {CaseNetAttributeAutocompleteCategory} from './case-net-attribute-autocomplete-category';
import {Categories} from '../categories';

export class CaseRole extends CaseNetAttributeAutocompleteCategory {

    private static readonly _i18n = 'search.category.case.role';

    constructor(protected _operators: OperatorService, logger: LoggerService, optionalDependencies: OptionalDependencies) {
        super(['enabledRoles'],
            [_operators.getOperator(Equals), _operators.getOperator(NotEquals)],
            `${CaseRole._i18n}.name`,
            logger,
            optionalDependencies);
    }

    protected extractAttributes(petriNet: Net): Array<NameIdPair> {
        return petriNet.roles.map(r => ({id: r.stringId, name: r.name}));
    }

    get inputPlaceholder(): string {
        return `${CaseRole._i18n}.placeholder`;
    }

    duplicate(): CaseRole {
        return new CaseRole(this._operators, this._log, this._optionalDependencies);
    }

    protected serialize(): Categories | string {
        return Categories.CASE_ROLE;
    }
}
