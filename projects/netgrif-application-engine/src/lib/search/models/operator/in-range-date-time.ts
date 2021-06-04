import {Operator} from './operator';
import moment, { Moment } from 'moment';
import {Query} from '../query/query';
import {Operators} from './operators';

/**
 * Range operator for indexed fields that store a date time in timestamp format.
 *
 * Will create a range query that matches every timestamp from the 0th millisecond of the first date time object (included)
 * to the 0th millisecond of the next minute after the minute in the second date time object (excluded).
 */
export class InRangeDateTime extends Operator<Moment> {
    constructor() {
        super(2);
    }

    /**
     * Creates a query as specified by the [classes]{@link InRangeDate} documentation.
     * See [super.createQuery()]{@link Operator#createQuery} for more information.
     * @param elasticKeywords keywords of the fields that should be queried.
     * If more than one is provided then queries for every keyword will be generated and combined with an OR operator.
     * @param args start and end date for the range. If you want to ignore the time information use {@link InRangeDate}
     * Operator instead. The two date time objects must be in ascending order, if not the behavior is undefined.
     */
    createQuery(elasticKeywords: Array<string>, args: Array<Moment>): Query {
        this.checkArgumentsCount(args);
        const arg1 = moment(args[0]);
        arg1.milliseconds(0);
        arg1.seconds(0);
        const arg2 = moment(args[1]);
        arg2.milliseconds(0);
        arg2.seconds(0);
        arg2.minutes(arg2.minutes() + 1); // moment handles rollover
        return Operator.forEachKeyword(elasticKeywords, (keyword: string) => {
            return new Query(`(${keyword}:[${arg1.valueOf()} TO ${arg2.valueOf()}})`);
        });
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.inRange.from', Operator.INPUT_PLACEHOLDER, 'search.operator.inRange.to', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.IN_RANGE_DATE_TIME;
    }
}
