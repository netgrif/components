import {Category} from '../category';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Substring} from '../../operator/substring';
import {SearchInputType} from '../search-input-type';

export class CaseVisualId extends Category<string> {

    private static readonly _i18n = 'search.category.case.visualId';

    constructor(operators: OperatorService, logger: LoggerService) {
        super(['visualId'],
            [operators.getOperator(Substring)],
            `${CaseVisualId._i18n}.name`,
            SearchInputType.TEXT,
            logger);
    }

    get inputPlaceholder(): string {
        return `${CaseVisualId._i18n}.placeholder`;
    }
}
