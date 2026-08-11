import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Substring} from '../../operator/substring';
import {SearchInputType} from '../search-input-type';
import {NoConfigurationCategory} from '../no-configuration-category';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';
import {Categories} from '../categories';
import {CaseSearch} from './case-search.enum';
import {OptionalDependencies} from "../../../category-factory/optional-dependencies";

export class CaseStringId extends NoConfigurationCategory<string> {

    private static readonly _i18n = 'search.category.case.stringId';

    constructor(operators: OperatorService, logger: LoggerService, protected _optionalDependencies?: OptionalDependencies) {
        super([CaseSearch.STRING_ID],
            [
                operators.getOperator(Substring),
                operators.getOperator(Equals),
                operators.getOperator(NotEquals)
            ],
            `${CaseStringId._i18n}.name`,
            SearchInputType.TEXT,
            logger,
            operators);
    }

    get inputPlaceholder(): string {
        return `${CaseStringId._i18n}.placeholder`;
    }

    duplicate(): CaseStringId {
        return new CaseStringId(this._operatorService, this._log);
    }

    serializeClass(): Categories | string {
        return Categories.CASE_STRING_ID;
    }

    protected get elasticKeywords(): Array<string> {
        if (!!this._optionalDependencies) {
            const resolver = this._optionalDependencies.searchIndexResolver;
            return [resolver.getCoreIndex(CaseSearch.STRING_ID, this.isSelectedOperator(Substring) || this.isSelectedOperator(Equals))];
        } else {
            return this._elasticKeywords;
        }
    }
}
