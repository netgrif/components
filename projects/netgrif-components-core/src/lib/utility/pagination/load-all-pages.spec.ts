import {Pagination} from '../../resources/interface/pagination';
import {HttpParams} from '@angular/common/http';
import {loadAllPages} from './load-all-pages';
import {MockEndpoint} from '../tests/mocks/mock-endpoint';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


describe('loadAllPages', () => {

    const defaultPagination: Pagination = {
        size: 1,
        totalElements: undefined,
        totalPages: undefined,
        number: 0
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule
            ]
        });
    });

    const endpoint = new MockEndpoint();

    it('should load one page', (done) => {
        endpoint.content = ['a'];
        const pagination = Object.assign({}, defaultPagination);

        loadAllPages((a, b) => endpoint.search(a, b as unknown as HttpParams), undefined, pagination).subscribe(result => {
            expect(result).toEqual(['a']);
            done();
        });
    });

    it('should load all pages', (done) => {
        endpoint.content = ['a', 'b', 'c', 'd'];
        const pagination = Object.assign({}, defaultPagination);

        loadAllPages((a, b) => endpoint.search(a, b as unknown as HttpParams), undefined, pagination).subscribe(result => {
            expect(result).toEqual(['a', 'b', 'c', 'd']);
            done();
        });
    });

    it('should load pages from the middle', (done) => {
        endpoint.content = ['a', 'b', 'c', 'd'];
        const pagination = Object.assign({}, defaultPagination, {number: 2});

        loadAllPages((a, b) => endpoint.search(a, b as unknown as HttpParams), undefined, pagination).subscribe(result => {
            expect(result).toEqual(['c', 'd']);
            done();
        });
    });

    it('should load incomplete pages', (done) => {
        endpoint.content = ['a', 'b', 'c', 'd'];
        const pagination = Object.assign({}, defaultPagination, {size: 5});

        loadAllPages((a, b) => endpoint.search(a, b as unknown as HttpParams), undefined, pagination).subscribe(result => {
            expect(result).toEqual(['a', 'b', 'c', 'd']);
            done();
        });
    });

    it('should load incomplete pages from the middle', (done) => {
        endpoint.content = ['a', 'b', 'c', 'd'];
        const pagination = Object.assign({}, defaultPagination, {size: 3, number: 1});

        loadAllPages((a, b) => endpoint.search(a, b as unknown as HttpParams), undefined, pagination).subscribe(result => {
            expect(result).toEqual(['d']);
            done();
        });
    });

    it('should provide default pagination', (done) => {
        endpoint.content = [
            'a', 'b', 'c', 'd', 'e',
            'a', 'b', 'c', 'd', 'e',
            'a', 'b', 'c', 'd', 'e',
            'a', 'b', 'c', 'd', 'e',
            'a', 'b', 'c', 'd', 'e',
            'a', 'b', 'c', 'd', 'e',
        ];

        loadAllPages((a, b) => endpoint.search(a, b as unknown as HttpParams), undefined).subscribe(result => {
            expect(result).toEqual([
                'a', 'b', 'c', 'd', 'e',
                'a', 'b', 'c', 'd', 'e',
                'a', 'b', 'c', 'd', 'e',
                'a', 'b', 'c', 'd', 'e',
                'a', 'b', 'c', 'd', 'e',
                'a', 'b', 'c', 'd', 'e',
            ]);
            done();
        });
    });

    it('should return empty array if out of range', (done) => {
        endpoint.content = ['a'];
        const pagination = Object.assign({}, defaultPagination, {number: 1});

        loadAllPages((a, b) => endpoint.search(a, b as unknown as HttpParams), undefined, pagination).subscribe(result => {
            expect(result).toEqual([]);
            done();
        });
    });

    it('should return empty array if endpoint has no content', (done) => {
        endpoint.content = [];
        const pagination = Object.assign({}, defaultPagination);

        loadAllPages((a, b) => endpoint.search(a, b as unknown as HttpParams), undefined, pagination).subscribe(result => {
            expect(result).toEqual([]);
            done();
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
