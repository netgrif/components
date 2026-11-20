import {BooleanOperator} from '../boolean-operator';
import {ResourceTypeQueryPrefix} from "../category/resource-type-query-prefix";

/**
 * Abstraction of queries, so that their implementation can be replaced as needed.
 */
export class Query {
    private static PREFIX_DELIMETER: string = ': ';

    /**
     * @param _value see [value]{@link Query#value} for the specification of this attribute.
     * @param _resourcePrefix resource prefix in a PFQL query
     * @param _empty use `true` if the Query object represents an empty query
     */
    constructor(private _value: string, private _resourcePrefix: string = undefined, private readonly _empty = false) {
        if (!this._value || this._value === '') {
            this._empty = true;
        }
        if (!!this._empty) {
            this._value = _resourcePrefix; // no filter is going to be applied to search
        }
    }

    /**
     * @returns a PFQL search query string.
     */
    public get value(): string {
        return this._value;
    }

    /**
     * @returns the query value without the resource type prefix. If no prefix is present, returns the full value or
     * empty string if the query contains only the resource prefix.
     */
    public get valueWithoutPrefix(): string {
        if (!this._resourcePrefix || !this._value || !this._value.startsWith(this._resourcePrefix + Query.PREFIX_DELIMETER)) {
            return this._value;
        }
        if (this._value === this._resourcePrefix) {
            return '';
        }
        return this._value.substring(this._resourcePrefix.length + Query.PREFIX_DELIMETER.length);
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
            return new Query(realQueries[0].value, realQueries[0].resourcePrefix);
        }
        const prefixes = new Set(realQueries.map(q => q.resourcePrefix).filter(p => p !== undefined));
        if (prefixes.size > 1) {
            throw new Error(`Cannot combine queries with different resource prefixes: ${[...prefixes].join(', ')}`);
        }
        const commonPrefix: string = prefixes.size === 1 ? [...prefixes][0] : undefined;
        const realQueriesWithoutPrefix: string[] = realQueries.map(q => q.valueWithoutPrefix);
        const isWildcard: boolean = realQueriesWithoutPrefix.some(queryValue => queryValue === '');
        if (operator === BooleanOperator.OR && isWildcard) {
            // no filter should be applied
            return new Query(undefined, commonPrefix);
        }
        const combinedQuery = realQueries
            .map(q => q.valueWithoutPrefix)
            .filter(q => q !== '')
            .map(q => '(' + q + ')')
            .join(` ${operator} `);
        const fullValue = commonPrefix ? commonPrefix + Query.PREFIX_DELIMETER + combinedQuery : combinedQuery;
        return new Query(fullValue, commonPrefix);
    }

    /**
     * Returns a `Query` with it's `value` set to an empty string.
     */
    public static emptyQuery(): Query {
        return new Query('', undefined, true);
    }

    /**
     * @param query the query that should be compared
     * @returns `true` if and only if the queries are equal.
     * Returns `false` if the queries are not equal, or if attempting to tell the queries apart is too complicated.
     * More specifically the method can always tell apart empty queries and if both queries are non-empty then their values are compared.
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

    /**
     * Adds a resource type prefix to the query value if it's not already present.
     * If the query is empty, sets the value to the provided prefix.
     * If the prefix is already present at the start of the value, returns the query unchanged.
     * Otherwise, prepends the prefix followed by the delimiter to the existing value.
     * @param resourceTypePrefix the resource type prefix to add to the query
     * @returns this Query instance with the updated value
     */
    public ensurePrefixAndGet(resourceTypePrefix: ResourceTypeQueryPrefix): Query {
        if (this.isEmpty) {
            this._value = resourceTypePrefix;
            return this;
        }
        if (this._value.startsWith(resourceTypePrefix + Query.PREFIX_DELIMETER)) {
            return this;
        }
        this._value = resourceTypePrefix + Query.PREFIX_DELIMETER + this._value;
        this._resourcePrefix = resourceTypePrefix;
        return this;
    }

    /**
     * @returns Resource prefix in a PFQL query. Might be undefined
     */
    public get resourcePrefix(): string | undefined {
        return this._resourcePrefix;
    }
}
