import {forkJoin, Observable, of} from 'rxjs';
import {Page} from '../../resources/interface/page';
import {Params} from '../../resources/resource-provider.service';
import {Pagination} from '../../resources/interface/pagination';
import {HttpParams} from '@angular/common/http';
import {concatMap, map} from 'rxjs/operators';
import {hasContent} from './page-has-content';

/**
 * Loads all pages from the given endpoint and returns their content as one array
 * @param source the method that is used to load an individual page, it must support pagination parameters
 * @param filter the filter/query object that is used to specify the requested objects. The `source` argument must accept this filter.
 * @param pagination configuration of the initial pagination.
 * Pages will be loaded from the provided page number onwards, page size will be upheld.
 * @returns content of all pages from the given page onwards (or from the start if no `pagination` argument was provided) as a single Array
 */
export function loadAllPages<T>(source: (filter: any, params: Params) => Observable<Page<T>>,
                                filter: any,
                                pagination?: Pagination): Observable<Array<T>> {
    const basePagination: Pagination = pagination ? pagination : {number: 0, size: 20, totalPages: undefined, totalElements: undefined};

    return source(filter, paginationParams(basePagination)).pipe(
        map(page => {
            basePagination.totalPages = page.pagination.totalPages;
            const pages = {};
            pages[basePagination.number] = (of(page.content));
            if (basePagination.number < basePagination.totalPages) {
                for (let pn = basePagination.number + 1; pn < basePagination.totalPages; pn++) {
                    const pagin: Pagination = Object.assign({}, basePagination, {number: pn});
                    pages[pn] = mapToContent(source, filter, pagin);
                }
            }
            return forkJoin(pages);
        }),
        concatMap(o => o),
        map((joined: {[k: string]: Array<T>}) => {
            const result = [];
            Object.values(joined).filter(v => Array.isArray(v)).forEach(arr => result.push(...arr));
            return result;
        })
    );
}

function paginationParams(basePagination: Pagination, pageNumber?: number): HttpParams {
    let params = new HttpParams();
    params = params.set('size', basePagination.size + '');
    params = params.set('page', (pageNumber !== undefined ? pageNumber : basePagination.number) + '');
    return params;
}

function mapToContent<T>(source: (filter: any, params: Params) => Observable<Page<T>>,
                         filter: any,
                         pagination: Pagination): Observable<Array<T>> {
    return source(filter, paginationParams(pagination)).pipe(
        map(page => {
            if (hasContent(page)) {
                return page.content;
            }
            return [];
        })
    );
}
