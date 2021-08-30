import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';
import {IsNull} from '../../operator/is-null';
import {Categories} from '../categories';
import {NoConfigurationUserAutocompleteCategory} from '../no-configuration-user-autocomplete-category';


export class TaskAssignee extends NoConfigurationUserAutocompleteCategory {

    private static readonly _i18n = 'search.category.task.assignee';

    constructor(operators: OperatorService, logger: LoggerService, optionalDependencies: OptionalDependencies) {
        super(['userId'],
            [operators.getOperator(Equals), operators.getOperator(NotEquals), operators.getOperator(IsNull)],
            `${TaskAssignee._i18n}.name`,
            logger,
            operators,
            'TaskAssignee',
            optionalDependencies);
    }

    get inputPlaceholder(): string {
        return `${TaskAssignee._i18n}.placeholder`;
    }

    duplicate(): TaskAssignee {
        return new TaskAssignee(this._operatorService, this._log, this._optionalDependencies);
    }

    serializeClass(): Categories | string {
        return Categories.TASK_ASSIGNEE;
    }
}
