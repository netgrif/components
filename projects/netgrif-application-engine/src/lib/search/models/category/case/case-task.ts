import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';
import {NameIdPair} from '../name-id-pair';
import {Net} from '../../../../process/net';
import {CaseNetAttributeAutocompleteCategory} from './case-net-attribute-autocomplete-category';
import {Categories} from '../categories';

export class CaseTask extends CaseNetAttributeAutocompleteCategory {

    private static readonly _i18n = 'search.category.case.task';

    constructor(protected _operators: OperatorService, logger: LoggerService, optionalDependencies: OptionalDependencies) {
        super(['taskIds'],
            [_operators.getOperator(Equals), _operators.getOperator(NotEquals)],
            `${CaseTask._i18n}.name`,
            logger,
            optionalDependencies);
    }

    protected extractAttributes(petriNet: Net): Array<NameIdPair> {
        return petriNet.transitions.map(t => ({id: t.stringId, name: t.title}));
    }

    get inputPlaceholder(): string {
        return `${CaseTask._i18n}.placeholder`;
    }

    duplicate(): CaseTask {
        return new CaseTask(this._operators, this._log, this._optionalDependencies);
    }

    protected serialize(): Categories | string {
        return Categories.CASE_TASK;
    }
}
