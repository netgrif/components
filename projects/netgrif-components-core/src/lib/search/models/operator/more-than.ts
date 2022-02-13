import {Operator} from './operator';
import {Operators} from './operators';

/**
 * A strict greater than operator for numeric fields.
 */
export class MoreThan extends Operator<number> {
    constructor() {
        super(1, '>');
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.moreThan', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.MORE_THAN;
    }
}
