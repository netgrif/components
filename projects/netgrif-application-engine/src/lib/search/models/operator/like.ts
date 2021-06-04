import {Operator} from './operator';
import {Query} from '../query/query';
import {Operators} from './operators';

/**
 * A fuzzy search operator for string fields.
 *
 * Behaves differently for strings with spaces and without.
 * With spaces searches for matches containing the tokenized strings.
 * Without spaces searches for strings within the default edit distance.
 * See [docs]{@link https://www.elastic.co/guide/en/elasticsearch/reference/6.6/query-dsl-query-string-query.html#_fuzziness}
 * for more information.
 */
export class Like extends Operator<string> {
    constructor() {
        super(1);
    }

    createQuery(elasticKeywords: Array<string>, args: Array<string>): Query {
        this.checkArgumentsCount(args);
        const escaped = Operator.escapeInput(args[0]);
        return Operator.forEachKeyword(elasticKeywords,
            keyword => escaped.wasEscaped ? new Query(`(${keyword}:${escaped.value})`) : new Query(`(${keyword}:${escaped.value}~)`));
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.like', Operator.INPUT_PLACEHOLDER];
    }

    serialize(): Operators | string {
        return Operators.LIKE;
    }
}
