import {Operator} from './operator';
import {Query} from '../query/query';
import {Operators} from './operators';

/**
 * A range operator for numeric fields, with closed interval on both sides of the range.
 */
export class InRange extends Operator<number> {
    constructor() {
        super(2);
    }

    createQuery(elasticKeywords: Array<string>, args: Array<number>): Query {
        this.checkArgumentsCount(args);
        return Operator.forEachKeyword(elasticKeywords, keyword => new Query(`(${keyword}:[${args[0]} TO ${args[1]}])`));
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.inRange.from', Operator.INPUT_PLACEHOLDER, 'search.operator.inRange.to', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.IN_RANGE;
    }
}
