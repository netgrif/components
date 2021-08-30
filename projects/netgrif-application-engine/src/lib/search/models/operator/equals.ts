import {Operator} from './operator';
import {Operators} from './operators';

/**
 * Strict equality operator. Will match if the field has the exact same value as the input.
 * Can be used with keyword fields and different types,
 * but it is not recommended to use it with date and datetime fields as an exact timestamp match would be required.
 * For timestamps use {@link EqualsDate} or {@link EqualsDateTime} instead.
 */
export class Equals extends Operator<string | number> {
    constructor() {
        // query string queries don't use a special symbol for strict equality
        super(1, '');
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.equals', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.EQUALS;
    }
}
