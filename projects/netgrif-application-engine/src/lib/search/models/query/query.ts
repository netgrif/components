import {BooleanOperator} from '../boolean-operator';

/**
 * Abstraction of queries, so that their implementation can be replaced as needed.
 */
export class Query {
    /**
     * @param _value see [value]{@link Query#value} for the specification of this attribute.
     * @param _empty use `true` if the Query object represents an empty query
     */
    constructor(private _value: string, private _empty = false) {
        if (!this._value || this._value === '') {
            this._empty = true;
        }
    }

    /**
     * @returns an Elastic search Query string query wrapped in braces.
     *
     * See Elasticsearch's
     * [documentation]{@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html}
     * for more information about Query string queries.
     */
    public get value(): string {
        return this._value;
    }

    /**
     * @returns whether this Query object represents an empty query or not
     */
    public get isEmpty(): boolean {
        return this._empty;
    }

    /**
     * Combines multiple queries into one with the provided operator.
     * @param queries queries that should be combined. Empty queries in the input array are ignored.
     * @param operator operator that is used to combine the queries
     * @returns a single query that is the combination of the non-empty queries in the input array. If the input array is empty an
     * [empty query]{@link Query#emptyQuery} will be returned.
     */
    public static combineQueries(queries: Array<Query>, operator: BooleanOperator): Query {
        const realQueries = queries.filter(q => !q.isEmpty);
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
        return new Query('', true);
    }

    /**
     * @param query the query that should be compared
     * @returns `true` if and only if the queries are equal.
     * Returns `false` if the queries are not equal, or if attempting to tell the queries apart is too complicated.
     * More specifically the method can always tell apart empty queries and if poth queries are non-empty then their values are compared.
     */
    public equals(query: Query): boolean {
        if (this.isEmpty && query.isEmpty) {
            return true;
        }
        if (this.isEmpty || query.isEmpty) {
            return false;
        }
        return this.value === query.value;
    }
}
