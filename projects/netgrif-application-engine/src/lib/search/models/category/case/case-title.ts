import {Category} from '../category';
import {OperatorService} from '../../../operator-service/operator.service';
import {Substring} from '../../operator/substring';
import {LoggerService} from '../../../../logger/services/logger.service';

export class CaseTitle extends Category {

    constructor(operators: OperatorService, logger: LoggerService) {
        super(['title'], [operators.getOperator(Substring)], 'search.category.case.title', logger);
    }
}
