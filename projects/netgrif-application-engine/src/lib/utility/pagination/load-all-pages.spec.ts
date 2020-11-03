import {Pagination} from '../../resources/interface/pagination';
import {HttpParams} from '@angular/common/http';
import {loadAllPages} from './load-all-pages';
import {MockEndpoint} from '../tests/mocks/mock-endpoint';


describe('loadAllPages', () => {

    const defaultPagination: Pagination = {
        size: 1,
        totalElements: undefined,
        totalPages: undefined,
        number: 0
    };

    const endpoint = new MockEndpoint();

    it('should load one page', (done) => {
        endpoint.content = ['a'];
        const pagination = Object.assign({}, defaultPagination);

        loadAllPages((a, b) => endpoint.search(a, b as unknown as HttpParams), undefined, pagination).subscribe(result => {
            expect(result).toEqual(['a']);
            done();
        });
    });

});
