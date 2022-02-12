import {Operator} from './operator';
import {Moment} from 'moment';
import {Query} from '../query/query';
import moment from 'moment';
import {clearTimeInformation} from '../../../utility/clear-time-information';
import {Operators} from './operators';

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
        this.checkArgumentsCount(args);
        const arg1 = moment(args[0]);
        clearTimeInformation(arg1);
        const arg2 = moment(args[1]);
        clearTimeInformation(arg2);
        arg2.date(arg2.date() + 1); // moment handles rollover
        return Operator.forEachKeyword(elasticKeywords, (keyword: string) => {
            return new Query(`(${keyword}:[${arg1.valueOf()} TO ${arg2.valueOf()}})`);
        });
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.inRange.from', Operator.INPUT_PLACEHOLDER, 'search.operator.inRange.to', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.IN_RANGE_DATE;
    }
}
