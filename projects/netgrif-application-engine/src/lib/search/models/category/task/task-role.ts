import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';
import {TaskNetAttributeAutocompleteCategory} from './task-net-attribute-autocomplete-category';
import {Net} from '../../../../process/net';
import {NameIdPair} from '../name-id-pair';
import {Categories} from '../categories';

export class TaskRole extends TaskNetAttributeAutocompleteCategory {

    private static readonly _i18n = 'search.category.task.role';

    constructor(protected _operators: OperatorService, logger: LoggerService, optionalDependencies: OptionalDependencies) {
        super(['roles'],
            [_operators.getOperator(Equals), _operators.getOperator(NotEquals)],
            `${TaskRole._i18n}.name`,
            logger,
            optionalDependencies);
    }

    protected extractAttributes(petriNet: Net): Array<NameIdPair> {
        return petriNet.roles.map(r => ({id: r.stringId, name: r.name}));
    }

    get inputPlaceholder(): string {
        return `${TaskRole._i18n}.placeholder`;
    }

    duplicate(): TaskRole {
        return new TaskRole(this._operators, this._log, this._optionalDependencies);
    }

    protected serialize(): Categories | string {
        return Categories.TASK_ROLE;
    }
}
