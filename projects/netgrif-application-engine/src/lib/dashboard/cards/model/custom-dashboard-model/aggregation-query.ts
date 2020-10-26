/**
 * Represents aggregation query for elasticsearch aggregations
 * See the documentation: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html
 */
export interface AggregationQuery {
    aggs: {
        [k: string]: any;
    };
}
