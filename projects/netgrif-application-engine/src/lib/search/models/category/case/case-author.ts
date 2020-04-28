import {Category} from '../category';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Substring} from '../../operator/substring';

export class CaseAuthor extends Category {

    constructor(operators: OperatorService, logger: LoggerService) {
        super(['authorEmail', 'authorName'], [operators.getOperator(Substring)], 'search.category.case.author', logger);
    }
}
