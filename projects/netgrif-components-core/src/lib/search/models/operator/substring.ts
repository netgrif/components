import {Operator} from './operator';
import {Operators} from './operators';

/**
 * Operator that matches if the input is a substring of some value.
 * Can only be used on fields that are texts and are not indexed as keywords.
 */
export class Substring extends Operator<string> {
    constructor() {
        super(1, Operators.SUBSTRING, 'contains');
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.substring', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.SUBSTRING;
    }

    negated(): Operator<any> {
        throw new Error("Operator Substring cannot be negated");
    }
}
