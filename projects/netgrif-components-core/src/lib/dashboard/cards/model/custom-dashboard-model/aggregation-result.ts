/**
 * Represents aggregation query for elasticsearch aggregations
 * See the documentation: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html
 */
export interface AggregationResult {
    aggregations: {
        result?: {
            buckets?: Array<BucketContent>;
        }
        types_count?: {
            value: number;
        };
    };
}

export interface BucketContent {
    key?: string;
    doc_count?: number;
}
