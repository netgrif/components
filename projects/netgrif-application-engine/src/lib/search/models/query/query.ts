import {BooleanOperator} from '../boolean-operator';

/**
 * Abstraction of queries from their string form, so that their implementation can be replaced as needed.
 */
export class Query {
    /**
     * @param _value see [value]{@link Query#value} for the specification of this attribute.
     */
    constructor(private _value: string) {
    }

    /**
     * Returns an Elastic search Query string query wrapped in braces.
     *
     * See Elasticsearch's
     * [documentation]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html}
     * for more information about Query string queries.
     */
    public get value(): string {
        return this._value;
    }

    /**
     * Combines multiple queries into one with the provided operator.
     * @param queries queries that should be combined. Empty queries in the input array are ignored.
     * @param operator operator that is used to combine the queries
     * @returns a single query that is the combination of the non-empty queries in the input array. If the input array is empty an
     * [empty query]{@link Query#emptyQuery} will be returned.
     */
    public static combineQueries(queries: Array<Query>, operator: BooleanOperator): Query {
        const realQueries = queries.filter(q => q.value !== '');
        if (realQueries.length === 0) {
            return Query.emptyQuery();
        }
        if (realQueries.length === 1) {
            return new Query(realQueries[0].value);
        }
        const combinedQuery = realQueries.map(q => q.value).join(` ${operator} `);
        return new Query(`(${combinedQuery})`);
    }

    /**
     * Returns a `Query` with it's `value` set to an empty string.
     */
    public static emptyQuery(): Query {
        return new Query('');
    }
}
