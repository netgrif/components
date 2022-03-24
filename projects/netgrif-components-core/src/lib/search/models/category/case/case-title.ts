import {OperatorService} from '../../../operator-service/operator.service';
import {Substring} from '../../operator/substring';
import {LoggerService} from '../../../../logger/services/logger.service';
import {SearchInputType} from '../search-input-type';
import {NoConfigurationCategory} from '../no-configuration-category';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';
import {Like} from '../../operator/like';
import {Categories} from '../categories';
import {CaseSearch} from './case-search.enum';

export class CaseTitle extends NoConfigurationCategory<string> {

    private static readonly _i18n = 'search.category.case.title';

    constructor(operators: OperatorService, logger: LoggerService) {
        super(undefined,
            [
                operators.getOperator(Substring),
                operators.getOperator(Equals),
                operators.getOperator(NotEquals),
                operators.getOperator(Like)
            ],
            `${CaseTitle._i18n}.name`,
            SearchInputType.TEXT,
            logger,
            operators);
    }

    get inputPlaceholder(): string {
        return `${CaseTitle._i18n}.placeholder`;
    }

    duplicate(): CaseTitle {
        return new CaseTitle(this._operatorService, this._log);
    }

    serializeClass(): Categories | string {
        return Categories.CASE_TITLE;
    }

    protected get elasticKeywords(): Array<string> {
        return [`${CaseSearch.TITLE}${this.isSelectedOperator(Substring) ? '.keyword' : ''}`];
    }
}
