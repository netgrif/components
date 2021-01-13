import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Substring} from '../../operator/substring';
import {SearchInputType} from '../search-input-type';
import {NoConfigurationCategory} from '../no-configuration-category';

export class CaseAuthor extends NoConfigurationCategory<string> {

    private static readonly _i18n = 'search.category.case.author';

    constructor(protected _operators: OperatorService, logger: LoggerService) {
        super(['authorEmail', 'authorName'],
            [_operators.getOperator(Substring)],
            `${CaseAuthor._i18n}.name`,
            SearchInputType.TEXT,
            logger);
    }

    get inputPlaceholder(): string {
        return `${CaseAuthor._i18n}.placeholder`;
    }

    duplicate(): CaseAuthor {
        return new CaseAuthor(this._operators, this._log);
    }
}
