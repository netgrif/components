/**
 * Constants for pagination configuration of HTTP requests.
 */
export enum PaginationParams {
    /**
     * Size of page - maximal number of elements per page.
     */
    PAGE_SIZE = 'size',
    /**
     * Requested page index. 0 based.
     */
    PAGE_NUMBER = 'page',
    /**
     * Sort configuration of the requested page. Use the {@link createSortParam} function to generate the value for this attribute.
     */
    PAGE_SORT = 'sort'
}
