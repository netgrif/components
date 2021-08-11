import {Injectable, Type} from '@angular/core';
import {Operator} from '../models/operator/operator';
import {Operators} from '../models/operator/operators';
import {Equals} from '../models/operator/equals';
import {EqualsDate} from '../models/operator/equals-date';
import {EqualsDateTime} from '../models/operator/equals-date-time';
import {InRange} from '../models/operator/in-range';
import {InRangeDate} from '../models/operator/in-range-date';
import {InRangeDateTime} from '../models/operator/in-range-date-time';
import {IsNull} from '../models/operator/is-null';
import {LessThan} from '../models/operator/less-than';
import {LessThanDate} from '../models/operator/less-than-date';
import {LessThanDateTime} from '../models/operator/less-than-date-time';
import {Like} from '../models/operator/like';
import {MoreThan} from '../models/operator/more-than';
import {MoreThanDate} from '../models/operator/more-than-date';
import {MoreThanDateTime} from '../models/operator/more-than-date-time';
import {NotEquals} from '../models/operator/not-equals';
import {NotEqualsDate} from '../models/operator/not-equals-date';
import {Substring} from '../models/operator/substring';
import {LessThanEqual} from '../models/operator/less-than-equal';
import {MoreThanEqual} from '../models/operator/more-than-equal';
import {MoreThanEqualDate} from '../models/operator/more-than-equal-date';
import {MoreThanEqualDateTime} from '../models/operator/more-than-equal-date-time';
import {LessThanEqualDate} from '../models/operator/less-than-equal-date';
import {LessThanEqualDateTime} from '../models/operator/less-than-equal-date-time';

/**
 * A service that resolves {@link Operators} (or custom string) into a concrete (@link Operator) implementation class.
 */
@Injectable({
    providedIn: 'root'
})
export class OperatorResolverService {

    /**
     * Resolves the operators in the {@link Operators} enum into their corresponding classes.
     * Passes all unresolved values into the [toCustomClass()]{@link OperatorResolverService#toCustomClass} method.
     * @param operator a serialized representation of the {@link Operator} class
     */
    public toClass(operator: Operators | string): Type<Operator<any>> | undefined {
        switch (operator) {
            default:
                return this.toCustomClass(operator);
            case Operators.EQUALS:
                return Equals;
            case Operators.EQUALS_DATE:
                return EqualsDate;
            case Operators.EQUALS_DATE_TIME:
                return EqualsDateTime;
            case Operators.IN_RANGE:
                return InRange;
            case Operators.IN_RANGE_DATE:
                return InRangeDate;
            case Operators.IN_RANGE_DATE_TIME:
                return InRangeDateTime;
            case Operators.IS_NULL:
                return IsNull;
            case Operators.LESS_THAN:
                return LessThan;
            case Operators.LESS_THAN_DATE:
                return LessThanDate;
            case Operators.LESS_THAN_DATE_TIME:
                return LessThanDateTime;
            case Operators.LESS_THAN_EQUAL:
                return LessThanEqual;
            case Operators.LESS_THAN_EQUAL_DATE:
                return LessThanEqualDate;
            case Operators.LESS_THAN_EQUAL_DATE_TIME:
                return LessThanEqualDateTime;
            case Operators.LIKE:
                return Like;
            case Operators.MORE_THAN:
                return MoreThan;
            case Operators.MORE_THAN_DATE:
                return MoreThanDate;
            case Operators.MORE_THAN_DATE_TIME:
                return MoreThanDateTime;
            case Operators.MORE_THAN_EQUAL:
                return MoreThanEqual;
            case Operators.MORE_THAN_EQUAL_DATE:
                return MoreThanEqualDate;
            case Operators.MORE_THAN_EQUAL_DATE_TIME:
                return MoreThanEqualDateTime;
            case Operators.NOT_EQUALS:
                return NotEquals;
            case Operators.NOT_EQUALS_DATE:
                return NotEqualsDate;
            case Operators.SUBSTRING:
                return Substring;
        }
    }

    /**
     * Should resolve any custom operators into their corresponding class objects.
     *
     * If you implement any custom {@link Operator} classes, you should override this method to resolve them after serialization.
     *
     * @param operator the serialized string provided by your [Operator.serialize()]{@link Operator#serialize} implementation
     * @returns `undefined`
     */
    protected toCustomClass(operator: string): Type<Operator<any>> | undefined {
        return undefined;
    }
}
