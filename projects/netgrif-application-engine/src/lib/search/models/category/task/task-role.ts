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

    constructor(operators: OperatorService, logger: LoggerService, optionalDependencies: OptionalDependencies) {
        super(['roles'],
            [operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${TaskRole._i18n}.name`,
            logger,
            operators,
            optionalDependencies);
    }

    protected extractAttributes(petriNet: Net): Array<NameIdPair> {
        return petriNet.roles.map(r => ({id: r.stringId, name: r.name}));
    }

    get inputPlaceholder(): string {
        return `${TaskRole._i18n}.placeholder`;
    }

    duplicate(): TaskRole {
        return new TaskRole(this._operatorService, this._log, this._optionalDependencies);
    }

    serializeClass(): Categories | string {
        return Categories.TASK_ROLE;
    }
}
