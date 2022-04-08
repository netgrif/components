/**
 * Constants for use with the
 */
export enum PaginationSort {
    ASCENDING = 'asc',
    DESCENDING = 'desc'
}

/**
 * Creates the configuration string for use with the [PAGE_SORT]{@link PaginationParams#PAGE_SORT} configuration attribute
 * @param attribute the name of the attribute that should be used for sorting the results
 * @param direction the sorting direction
 */
export function createSortParam(attribute: string, direction: PaginationSort): string {
    return `${attribute},${direction}`;
}
