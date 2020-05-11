import {Category} from '../category';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Substring} from '../../operator/substring';
import {SearchInputType} from '../search-input-type';

export class CaseVisualId extends Category<string> {

    constructor(operators: OperatorService, logger: LoggerService) {
        super(['visualId'],
            [operators.getOperator(Substring)],
            'search.category.case.visualId',
            SearchInputType.TEXT,
            logger);
    }

    get inputPlaceholder(): string {
        return 'search.placeholder.category.case.visualId';
    }
}
