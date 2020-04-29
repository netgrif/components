/**
 * HTTP request params for the {@link MergedFilter}.
 *
 * See {@link MergedFilter} and {@link Params} for more information.
 */
export interface MergedFilterParams {
    /**
     * The operation that is used to merge the filters.
     *
     * See {@link MergeOperator} for more information.
     */
    'operation': 'AND' | 'OR';
}
