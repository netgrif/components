import {Category} from "../category";
import {OperatorService} from "../../../operator-service/operator.service";
import {LoggerService} from "../../../../logger/services/logger.service";
import {ResourceTypeQueryPrefix} from "../resource-type-query-prefix";
import {Categories} from "../categories";
import {PlainQueryCategory} from "../plain-query-category";

/**
 * Plain query category implementation for task-related search operations.
 *
 * This class extends {@link PlainQueryCategory} to provide task-specific query functionality,
 * using the TASKS resource type prefix for query generation.
 */
export class TaskPlainQuery extends PlainQueryCategory {

    constructor(operators: OperatorService, logger: LoggerService) {
        super(operators, logger, ResourceTypeQueryPrefix.TASKS);
    }

    duplicate(): Category<string> {
        return new TaskPlainQuery(this._operatorService, this._log);
    }

    serializeClass(): string {
        return Categories.TASK_PLAIN_QUERY;
    }
}
