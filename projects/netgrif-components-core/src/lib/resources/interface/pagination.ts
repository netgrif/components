/**
 * Page
 */
export interface Pagination {
    /**
     * actual size
     */
    size: number;
    /**
     * total count
     */
    totalElements: number;
    /**
     * total count page
     */
    totalPages: number;
    /**
     * actual page
     */
    number: number;
}
