import {Page} from './page';

/**
 * Object from Backend
 */
export interface ResponseData<T> {
    _embedded: T;
    _links: object;
    page: Page;
}
