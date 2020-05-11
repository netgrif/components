import {Category} from '../category';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Substring} from '../../operator/substring';
import {SearchInputType} from '../search-input-type';

export class CaseAuthor extends Category<string> {

    constructor(operators: OperatorService, logger: LoggerService) {
        super(['authorEmail', 'authorName'],
            [operators.getOperator(Substring)],
            'search.category.case.author',
            SearchInputType.TEXT,
            logger);
    }

    get inputPlaceholder(): string {
        return 'search.placeholder.category.case.author';
    }
}
