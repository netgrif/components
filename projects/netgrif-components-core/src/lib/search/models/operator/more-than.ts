import {Operator} from './operator';
import {Operators} from './operators';

/**
 * A strict greater than operator for numeric or string fields.
 */
export class MoreThan extends Operator<number | string> {
    constructor() {
        super(1, Operators.MORE_THAN, 'gt');
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.moreThan', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.MORE_THAN;
    }
}
