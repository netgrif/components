import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Substring} from '../../operator/substring';
import {SearchInputType} from '../search-input-type';
import {NoConfigurationCategory} from '../no-configuration-category';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';
import {Categories} from '../categories';

export class CaseAuthor extends NoConfigurationCategory<string> {

    private static readonly _i18n = 'search.category.case.author';

    constructor(operators: OperatorService, logger: LoggerService) {
        super(['authorEmail', 'authorName'],
            [operators.getOperator(Substring), operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${CaseAuthor._i18n}.name`,
            SearchInputType.TEXT,
            logger,
            operators);
    }

    get inputPlaceholder(): string {
        return `${CaseAuthor._i18n}.placeholder`;
    }

    duplicate(): CaseAuthor {
        return new CaseAuthor(this._operatorService, this._log);
    }

    serializeClass(): Categories | string {
        return Categories.CASE_AUTHOR;
    }
}
