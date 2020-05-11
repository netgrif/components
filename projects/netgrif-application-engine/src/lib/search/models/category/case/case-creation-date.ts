import {Category} from '../category';
import {Moment} from 'moment';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {EqualsDate} from '../../operator/equals-date';
import {SearchInputType} from '../search-input-type';

export class CaseCreationDate extends Category<Moment> {

    constructor(operators: OperatorService, logger: LoggerService) {
        super(['creationDateSortable'],
            [operators.getOperator(EqualsDate)],
            'search.category.case.creationDate',
            SearchInputType.DATE,
            logger);
    }

    get inputPlaceholder(): string {
        return 'search.placeholder.category.case.creationDate';
    }
}
