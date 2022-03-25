import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Substring} from '../../operator/substring';
import {SearchInputType} from '../search-input-type';
import {NoConfigurationCategory} from '../no-configuration-category';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';
import {Categories} from '../categories';
import {CaseSearch} from './case-search.enum';

export class CaseVisualId extends NoConfigurationCategory<string> {

    private static readonly _i18n = 'search.category.case.visualId';

    constructor(operators: OperatorService, logger: LoggerService) {
        super(undefined,
            [operators.getOperator(Substring), operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${CaseVisualId._i18n}.name`,
            SearchInputType.TEXT,
            logger,
            operators);
    }

    get inputPlaceholder(): string {
        return `${CaseVisualId._i18n}.placeholder`;
    }

    duplicate(): CaseVisualId {
        return new CaseVisualId(this._operatorService, this._log);
    }

    serializeClass(): Categories | string {
        return Categories.CASE_VISUAL_ID;
    }

    protected get elasticKeywords(): Array<string> {
        return [`${CaseSearch.VISUAL_ID}${this.isSelectedOperator(Substring) ? '.keyword' : ''}`];
    }
}
