import {OperatorService} from '../../../operator-service/operator.service';
import {Substring} from '../../operator/substring';
import {LoggerService} from '../../../../logger/services/logger.service';
import {SearchInputType} from '../search-input-type';
import {NoConfigurationCategory} from '../no-configuration-category';

export class CaseTitle extends NoConfigurationCategory<string> {

    private static readonly _i18n = 'search.category.case.title';

    constructor(operators: OperatorService, logger: LoggerService) {
        super(['title'],
            [operators.getOperator(Substring)],
            `${CaseTitle._i18n}.name`,
            SearchInputType.TEXT,
            logger);
    }

    get inputPlaceholder(): string {
        return `${CaseTitle._i18n}.placeholder`;
    }
}
