import {Operator} from './operator';
import {Operators} from './operators';

/**
 * Greater or equal than operator for numeric or string fields
 */
export class MoreThanEqual extends Operator<number | string> {

    constructor() {
        super(1, 'gte');
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.moreThanEqual', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN_EQUAL;
    }


}
