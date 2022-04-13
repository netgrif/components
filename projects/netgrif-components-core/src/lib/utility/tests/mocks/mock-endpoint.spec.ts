import {MockEndpoint} from './mock-endpoint';
import {HttpParams} from '@angular/common/http';
import {hasContent} from '../../pagination/page-has-content';
import {PaginationParams} from '../../pagination/pagination-params';

describe('MockEndpoint', () => {

    const endpoint = new MockEndpoint();

    it('should create', () => {
        expect(endpoint).toBeTruthy();
    });

    it('should return content', (done) => {
        endpoint.content = ['a'];

        endpoint.search(undefined, paginationParams(0, 1)).subscribe(result => {
            expect(result.content).toBeTruthy();
            expect(result.content).toEqual(['a']);
            done();
        });
    });

    it('should return correct pagination information', (done) => {
        endpoint.content = ['a', 'b', 'c'];

        endpoint.search(undefined, paginationParams(1, 2)).subscribe(result => {
            expect(result.pagination).toBeTruthy();
            expect(result.pagination.number).toEqual(1);
            expect(result.pagination.totalPages).toEqual(2);
            expect(result.pagination.totalElements).toEqual(3);
            expect(result.pagination.size).toEqual(1);
            expect(result.content).toBeTruthy();
            expect(hasContent(result)).toBeTrue();
            expect(result.content.length).toEqual(1);
            done();
        });
    });

    it('should return no content if empty', (done) => {
        endpoint.content = [];

        endpoint.search(undefined, paginationParams(0, 1)).subscribe(result => {
            expect(result.pagination).toBeTruthy();
            expect(result.pagination.number).toEqual(0);
            expect(result.pagination.totalPages).toEqual(0);
            expect(result.pagination.totalElements).toEqual(0);
            expect(result.pagination.size).toEqual(0);
            expect(result.content).toBeTruthy();
            expect(hasContent(result)).toBeFalse();
            done();
        });
    });

    it('should return no content if out of range', (done) => {
        endpoint.content = ['a', 'b', 'c'];

        endpoint.search(undefined, paginationParams(1, 5)).subscribe(result => {
            expect(result.pagination).toBeTruthy();
            expect(result.pagination.number).toEqual(1);
            expect(result.pagination.totalPages).toEqual(1);
            expect(result.pagination.totalElements).toEqual(3);
            expect(result.pagination.size).toEqual(0);
            expect(result.content).toBeTruthy();
            expect(hasContent(result)).toBeFalse();
            done();
        });
    });
});

function paginationParams(page: number, size: number): HttpParams {
    let params = new HttpParams();
    params = params.set(PaginationParams.PAGE_SIZE, `${size}`);
    params = params.set(PaginationParams.PAGE_NUMBER, `${page}`);
    return params;
}
