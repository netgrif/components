import {Category} from '../category';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Substring} from '../../operator/substring';
import {SearchInputType} from '../search-input-type';

export class CaseAuthor extends Category<string> {

    private static readonly _i18n = 'search.category.case.author';

    constructor(operators: OperatorService, logger: LoggerService) {
        super(['authorEmail', 'authorName'],
            [operators.getOperator(Substring)],
            `${CaseAuthor._i18n}.name`,
            SearchInputType.TEXT,
            logger);
    }

    get inputPlaceholder(): string {
        return `${CaseAuthor._i18n}.placeholder`;
    }
}
