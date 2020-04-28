import {Category} from '../category';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Substring} from '../../operator/substring';

export class CaseVisualId extends Category {

    constructor(operators: OperatorService, logger: LoggerService) {
        super(['visualId'], [operators.getOperator(Substring)], 'search.category.case.visualId', logger);
    }
}
