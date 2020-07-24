import {Pagination} from './pagination';

/**
 * One resource page
 */
export interface Page<T> {

    /**
     * Resource content of a page
     */
    content: Array<T>;

    /**
     * Information about current pagination state
     */
    pagination: Pagination;

}
