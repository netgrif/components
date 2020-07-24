import {Pagination} from './pagination';

/**
 * Response form Backend
 * input T
 */
export interface ResponseData<T> {
    /**
     * input T
     */
    _embedded: T;
    /**
     * Links
     */
    _links: object;
    /**
     * Pages
     */
    page: Pagination;
}
