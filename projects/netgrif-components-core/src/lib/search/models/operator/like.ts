import {Operator} from './operator';
import {Query} from '../query/query';
import {Operators} from './operators';

/**
 * A fuzzy search operator for string fields.
 *
 * Behaves differently for strings with spaces and without.
 * With spaces searches for matches containing the tokenized strings.
 * Without spaces searches for strings within the default edit distance.
 */
export class Like extends Operator<string> {
    constructor() {
        super(1, Operators.LIKE);
    }

    createQuery(pfqlKeywords: Array<string>, args: Array<string>): Query {
        this.checkArgumentsCount(args);
        const escaped = Operator.escapeInput(args[0]); // todo 2466 escape?
        return Operator.forEachKeyword(pfqlKeywords,
            keyword => escaped.wasEscaped ? new Query(`${keyword} eq '${escaped.value}'`) : new Query(`${keyword} eq '${escaped.value}'*`));
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.like', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LIKE;
    }

    negated(): Operator<any> {
        throw new Error("Operator Like cannot be negated");
    }
}
