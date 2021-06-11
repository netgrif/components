import {Operator} from './operator';
import {Operators} from './operators';

/**
 * Greater or equal than operator for numeric fields
 */
export class MoreThanEqual extends Operator<number> {

    constructor() {
        super(1, '>=');
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.moreThanEqual', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN_EQUAL;
    }


}
