import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {Equals} from '../../operator/equals';
import {NotEquals} from '../../operator/not-equals';
import {Categories} from '../categories';
import {CaseSearch} from './case-search.enum';
import {OptionalDependencies} from '../../../category-factory/optional-dependencies';
import {NoConfigurationUserAutocompleteCategory} from '../no-configuration-user-autocomplete-category';


export class CaseAuthor extends NoConfigurationUserAutocompleteCategory {

    private static readonly _i18n = 'search.category.case.author';

    constructor(operators: OperatorService, logger: LoggerService, optionalDependencies: OptionalDependencies) {
        super([CaseSearch.AUTHOR],
            [operators.getOperator(Equals), operators.getOperator(NotEquals)],
            `${CaseAuthor._i18n}.name`,
            logger,
            operators,
            'CaseAuthor',
            optionalDependencies);
    }

    get inputPlaceholder(): string {
        return `${CaseAuthor._i18n}.placeholder`;
    }

    duplicate(): CaseAuthor {
        return new CaseAuthor(this._operatorService, this._log, this._optionalDependencies);
    }

    serializeClass(): Categories | string {
        return Categories.CASE_AUTHOR;
    }
}
