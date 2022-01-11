import {InRangeDateTime} from './in-range-date-time';
import {OperatorService} from '../../operator-service/operator.service';
import {Moment} from 'moment';
import {Query} from '../query/query';
import {Operator} from './operator';
import {Operators} from './operators';

/**
 * Equality operator for indexed fields that store a date time object in timestamp format.
 *
 * Will create a range query that matches every timestamp from the 0th millisecond of the selected date time object (included)
 * to the 0th millisecond after of the next minute after the minute of the date time object (excluded).
 */
export class EqualsDateTime extends Operator<Moment> {

    protected dateTimeRange: InRangeDateTime;

    constructor(operators: OperatorService) {
        super(1);
        this.dateTimeRange = operators.getOperator(InRangeDateTime) as InRangeDateTime;
    }

    createQuery(elasticKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        return this.dateTimeRange.createQuery(elasticKeywords, [args[0], args[0]]);
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.equals', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.EQUALS_DATE_TIME;
    }
}
