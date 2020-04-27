import {Page} from './page';

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
    page: Page;
}
