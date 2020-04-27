import {Page} from './page';

export interface ResponseData<T> {
    _embedded: T;
    _links: object;
    page: Page;
}
