import {Operator} from './operator';
import {Operators} from './operators';

/**
 * A strict less than operator for numeric fields.
 */
export class LessThan extends Operator<number> {
    constructor() {
        super(1, '<');
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.lessThan', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LESS_THAN;
    }
}
