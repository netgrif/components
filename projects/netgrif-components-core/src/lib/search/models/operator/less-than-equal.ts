import {Operator} from './operator';
import {Operators} from './operators';

/**
 * Less or equal than operator for numeric or string fields
 */
export class LessThanEqual extends Operator<number | string> {

    constructor() {
        super(1, 'lte');
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.lessThanEqual', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN_EQUAL;
    }


}
