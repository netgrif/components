import {Operator} from './operator';
import {Operators} from './operators';
import {LessThan} from "./less-than";

/**
 * Greater or equal than operator for numeric or string fields
 */
export class MoreThanEqual extends Operator<number | string> {

    constructor() {
        super(1, Operators.MORE_THAN_EQUAL, 'gte');
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.moreThanEqual', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN_EQUAL;
    }

    negated(): Operator<any> {
        return new LessThan();
    }
}
