import {Moment} from 'moment';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {EqualsDate} from '../../operator/equals-date';
import {SearchInputType} from '../search-input-type';
import {NoConfigurationCategory} from '../no-configuration-category';
import {NotEqualsDate} from '../../operator/not-equals-date';
import {MoreThanDate} from '../../operator/more-than-date';
import {LessThanDate} from '../../operator/less-than-date';
import {InRangeDate} from '../../operator/in-range-date';
import {Categories} from '../categories';
import {FormControl} from '@angular/forms';

export class CaseCreationDate extends NoConfigurationCategory<Moment> {

    private static readonly _i18n = 'search.category.case.creationDate';

    constructor(protected _operators: OperatorService, logger: LoggerService) {
        super(['creationDateSortable'],
            [
                _operators.getOperator(EqualsDate),
                _operators.getOperator(NotEqualsDate),
                _operators.getOperator(MoreThanDate),
                _operators.getOperator(LessThanDate),
                _operators.getOperator(InRangeDate)
            ],
            `${CaseCreationDate._i18n}.name`,
            SearchInputType.DATE,
            logger);
    }

    get inputPlaceholder(): string {
        return `${CaseCreationDate._i18n}.placeholder`;
    }

    duplicate(): CaseCreationDate {
        return new CaseCreationDate(this._operators, this._log);
    }

    protected serialize(): Categories | string {
        return Categories.CASE_CREATION_DATE;
    }

    protected serializeOperandValue(valueFormControl: FormControl): unknown {
        return valueFormControl.value.valueOf();
    }
}
