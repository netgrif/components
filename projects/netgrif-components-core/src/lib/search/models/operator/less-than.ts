import {Operator} from './operator';
import {Operators} from './operators';
import {MoreThanEqual} from "./more-than-equal";

/**
 * A strict less than operator for numeric or string fields.
 */
export class LessThan extends Operator<number | string> {
    constructor() {
        super(1, Operators.LESS_THAN, 'lt');
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.lessThan', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN;
    }

    negated(): Operator<any> {
        return new MoreThanEqual();
    }
}
