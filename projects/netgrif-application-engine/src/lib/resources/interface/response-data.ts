export interface ResponseData<T> {
    _embedded: T;
    _links: object;
    _page: object;
}
