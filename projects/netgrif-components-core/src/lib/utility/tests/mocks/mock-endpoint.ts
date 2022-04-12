import {HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Page} from '../../../resources/interface/page';
import {PaginationParams} from '../../pagination/pagination-params';

interface RequestedPagination {
    pageSize: number;
    pageNumber: number;
}

/**
 * A utility class that mock any pageable endpoint that takes one parameter
 */
export class MockEndpoint {

    /**
     * The content that is queries by the requests.
     */
    content: Array<string> = [];

    /**
     * @param filter - a filtering argument. This mock ignores it.
     * @param params - pagination configuration. The mock extracts the `size` and `page` property to format the result properly.
     * @returns an `Observable` containing a properly formatted {@link Page} object.
     *
     * The `pagination` attributes are filled according to the request and the endpoints [content]{@link MockEndpoint#content}.
     *
     * If an empty {@link Page} should be returned the returned object has its `content` attribute set to some object
     * (to match backend and resource service behavior).
     * Otherwise the `content` attribute contains the corresponding subsection fo the [content]{@link MockEndpoint#content} array.
     */
    search(filter: unknown, params: HttpParams): Observable<Page<unknown>> {
        const rp = this.getPagination(params);

        const result = this.content.slice(rp.pageSize * rp.pageNumber, rp.pageSize * (rp.pageNumber + 1));
        const resultPage = {
            pagination: {
                size: result.length,
                totalElements: this.content.length,
                totalPages: Math.ceil(this.content.length / rp.pageSize),
                number: rp.pageNumber
            }
        };
        Object.assign(resultPage, {content: result.length !== 0 ? result : {}});
        return of(resultPage as Page<unknown>);
    }

    private getPagination(params: HttpParams): RequestedPagination {
        return {
            pageSize: parseInt(params.get(PaginationParams.PAGE_SIZE), 10),
            pageNumber: parseInt(params.get(PaginationParams.PAGE_NUMBER), 10)
        };
    }
}
