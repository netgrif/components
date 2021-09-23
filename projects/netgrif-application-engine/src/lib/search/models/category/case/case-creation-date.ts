import moment, {Moment} from 'moment';
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
import {Observable, of} from 'rxjs';
import {MoreThanEqualDate} from '../../operator/more-than-equal-date';
import {LessThanEqualDate} from '../../operator/less-than-equal-date';
import {CaseSearch} from './case-search.enum';

export class CaseCreationDate extends NoConfigurationCategory<Moment> {

    private static readonly _i18n = 'search.category.case.creationDate';

    constructor(operators: OperatorService, logger: LoggerService) {
        super([CaseSearch.CREATION_DATE],
            [
                operators.getOperator(EqualsDate),
                operators.getOperator(NotEqualsDate),
                operators.getOperator(MoreThanDate),
                operators.getOperator(MoreThanEqualDate),
                operators.getOperator(LessThanDate),
                operators.getOperator(LessThanEqualDate),
                operators.getOperator(InRangeDate)
            ],
            `${CaseCreationDate._i18n}.name`,
            SearchInputType.DATE,
            logger,
            operators);
    }

    get inputPlaceholder(): string {
        return `${CaseCreationDate._i18n}.placeholder`;
    }

    duplicate(): CaseCreationDate {
        return new CaseCreationDate(this._operatorService, this._log);
    }

    serializeClass(): Categories | string {
        return Categories.CASE_CREATION_DATE;
    }

    protected serializeOperandValue(valueFormControl: FormControl): unknown {
        return valueFormControl.value.valueOf();
    }

    protected deserializeOperandValue(value: string): Observable<any> {
        return of(moment(value));
    }
}
