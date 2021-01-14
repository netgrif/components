import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Substring} from '../../operator/substring';
import {SearchInputType} from '../search-input-type';
import {NoConfigurationCategory} from '../no-configuration-category';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';

export class CaseVisualId extends NoConfigurationCategory<string> {

    private static readonly _i18n = 'search.category.case.visualId';

    constructor(protected _operators: OperatorService, logger: LoggerService) {
        super(['visualId'],
            [_operators.getOperator(Substring), _operators.getOperator(Equals), _operators.getOperator(NotEquals)],
            `${CaseVisualId._i18n}.name`,
            SearchInputType.TEXT,
            logger);
    }

    get inputPlaceholder(): string {
        return `${CaseVisualId._i18n}.placeholder`;
    }

    duplicate(): CaseVisualId {
        return new CaseVisualId(this._operators, this._log);
    }
}
