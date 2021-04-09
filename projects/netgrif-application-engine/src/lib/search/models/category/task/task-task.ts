import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';
import {TaskNetAttributeAutocompleteCategory} from './task-net-attribute-autocomplete-category';
import {Net} from '../../../../process/net';
import {NameIdPair} from '../name-id-pair';
import {Categories} from '../categories';


export class TaskTask extends TaskNetAttributeAutocompleteCategory {

    private static readonly _i18n = 'search.category.task.task';

    constructor(operators: OperatorService, logger: LoggerService, optionalDependencies: OptionalDependencies) {
        super(['transitionId'],
            [operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${TaskTask._i18n}.name`,
            logger,
            operators,
            optionalDependencies);
    }

    protected extractAttributes(petriNet: Net): Array<NameIdPair> {
        return petriNet.transitions.map(t => ({id: t.stringId, name: t.title}));
    }

    get inputPlaceholder(): string {
        return `${TaskTask._i18n}.placeholder`;
    }

    duplicate(): TaskTask {
        return new TaskTask(this._operatorService, this._log, this._optionalDependencies);
    }

    serializeClass(): Categories | string {
        return Categories.TASK_TASK;
    }
}
