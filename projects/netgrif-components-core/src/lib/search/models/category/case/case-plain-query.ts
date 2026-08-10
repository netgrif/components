import {Category} from "../category";
import {OperatorService} from "../../../operator-service/operator.service";
import {LoggerService} from "../../../../logger/services/logger.service";
import {ResourceTypeQueryPrefix} from "../resource-type-query-prefix";
import {Categories} from "../categories";
import {PlainQueryCategory} from "../plain-query-category";

// todo 2466 doc
export class CasePlainQuery extends PlainQueryCategory {

    constructor(operators: OperatorService, logger: LoggerService) {
        super(operators, logger, ResourceTypeQueryPrefix.CASES);
    }

    duplicate(): Category<string> {
        return new CasePlainQuery(this._operatorService, this._log);
    }

    serializeClass(): string {
        return Categories.CASE_PLAIN_QUERY;
    }

}
