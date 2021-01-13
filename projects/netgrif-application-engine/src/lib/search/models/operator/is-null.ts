import {Operator} from './operator';
import {Query} from '../query/query';

/**
 * An operator that can be used on any field and matches entries with null or empty string values.
 */
export class IsNull extends Operator<any> {
    constructor() {
        super(0);
    }

    createQuery(elasticKeywords: Array<string>): Query {
        return Operator.forEachKeyword(elasticKeywords, keyword => new Query(`((!(_exists_:${keyword})) OR (${keyword}:""))`));
    }

    getOperatorNameTemplate(): Array<string> {
        return ['search.operator.isNull'];
    }
}
