import moment, {Moment} from 'moment';
import {OperatorService} from '../../../operator-service/operator.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {SearchInputType} from '../search-input-type';
import {NoConfigurationCategory} from '../no-configuration-category';
import {Categories} from '../categories';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {EqualsDateTime} from '../../operator/equals-date-time';
import {MoreThanDateTime} from '../../operator/more-than-date-time';
import {MoreThanEqualDateTime} from '../../operator/more-than-equal-date-time';
import {LessThanEqualDateTime} from '../../operator/less-than-equal-date-time';
import {InRangeDateTime} from '../../operator/in-range-date-time';
import {LessThanDateTime} from '../../operator/less-than-date-time';
import {CaseSearch} from './case-search.enum';
import {NotEqualsDateTime} from '../../operator/not-equals-date-time';


export class CaseCreationDateTime extends NoConfigurationCategory<Moment> {

    private static readonly _i18n = 'search.category.case.creationDateTime';

    constructor(operators: OperatorService, logger: LoggerService) {
        super([CaseSearch.CREATION_DATE],
            [
                operators.getOperator(EqualsDateTime),
                operators.getOperator(NotEqualsDateTime),
                operators.getOperator(MoreThanDateTime),
                operators.getOperator(MoreThanEqualDateTime),
                operators.getOperator(LessThanDateTime),
                operators.getOperator(LessThanEqualDateTime),
                operators.getOperator(InRangeDateTime)
            ],
            `${CaseCreationDateTime._i18n}.name`,
            SearchInputType.DATE_TIME,
            logger,
            operators);
    }

    get inputPlaceholder(): string {
        return `${CaseCreationDateTime._i18n}.placeholder`;
    }

    duplicate(): CaseCreationDateTime {
        return new CaseCreationDateTime(this._operatorService, this._log);
    }

    serializeClass(): Categories | string {
        return Categories.CASE_CREATION_DATE_TIME;
    }

    protected serializeOperandValue(valueFormControl: FormControl): unknown {
        return valueFormControl.value.valueOf();
    }

    protected deserializeOperandValue(value: string): Observable<any> {
        return of(moment(value));
    }
}
