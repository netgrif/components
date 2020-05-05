import {Operator} from './operator';
import {Moment} from 'moment';
import {Query} from '../query/query';
import moment from 'moment';

/**
 * Range operator for indexed fields that store a date in timestamp format.
 *
 * Will create a range query that matches every timestamp from the midnight of the first day (included)
 * to the midnight of the day after the second day (excluded).
 */
export class InRangeDate extends Operator<Moment> {
    constructor() {
        super(2);
    }

    /**
     * Creates a query as specified by the [classes]{@link InRangeDate} documentation.
     * See [super.createQuery()]{@link Operator#createQuery} for more information.
     * @param elasticKeywords keywords of the fields that should be queried.
     * If more than one is provided then queries for every keyword will be generated and combined with an OR operator.
     * @param args start and end date for the range. Any time information will be ignored use {@link InRangeDateTime}
     * if you want a date time query instead. The two dates must be in ascending order, if not the behavior is undefined.
     */
    createQuery(elasticKeywords: Array<string>, args: Array<Moment>): Query {
        const arg2 = moment(args[1]);
        arg2.date(arg2.date() + 1); // moment handles rollover
        return Operator.forEachKeyword(elasticKeywords, (keyword: string) => {
            return new Query(`(${keyword}:[${args[0].valueOf()} TO ${arg2.valueOf()}})`);
        });
    }
}
