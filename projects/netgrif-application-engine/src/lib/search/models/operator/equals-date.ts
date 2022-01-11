import {Operator} from './operator';
import {Moment} from 'moment';
import {Query} from '../query/query';
import {OperatorService} from '../../operator-service/operator.service';
import {InRangeDate} from './in-range-date';
import {Operators} from './operators';

/**
 * Equality operator for indexed fields that store a date in timestamp format.
 *
 * Will create a range query that matches every timestamp from the midnight of the selected day (included)
 * to the midnight of the next day (excluded).
 */
export class EqualsDate extends Operator<Moment> {

    protected dateRange: InRangeDate;

    constructor(operators: OperatorService) {
        super(1);
        this.dateRange = operators.getOperator(InRangeDate) as InRangeDate;
    }

    createQuery(elasticKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        return this.dateRange.createQuery(elasticKeywords, [args[0], args[0]]);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.equals', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.EQUALS_DATE;
    }
}
