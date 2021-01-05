import {Moment} from 'moment';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {EqualsDate} from '../../operator/equals-date';
import {SearchInputType} from '../search-input-type';
import {NoConfigurationCategory} from '../no-configuration-category';

export class CaseCreationDate extends NoConfigurationCategory<Moment> {

    private static readonly _i18n = 'search.category.case.creationDate';

    constructor(operators: OperatorService, logger: LoggerService) {
        super(['creationDateSortable'],
            [operators.getOperator(EqualsDate)],
            `${CaseCreationDate._i18n}.name`,
            SearchInputType.DATE,
            logger);
    }

    get inputPlaceholder(): string {
        return `${CaseCreationDate._i18n}.placeholder`;
    }
}
