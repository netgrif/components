import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';


export type Observe = 'body';

export type Headers =
    HttpHeaders | {
    [header: string]: string | string[];
};

export type Params =
    HttpParams | {
    [param: string]: string | string[];
};

export type ResponseType = 'json';


export abstract class AbstractResourceProvider {

    protected constructor(protected httpClient: HttpClient) {
    }

    private static addLastSlash(link: string): string {
        if (link.length > 0) {
            return link.charAt(link.length - 1) === '/' ? link : link + '/';
        } else {
            throw Error('No define api url');
        }
    }

    private static removeFirstSlash(link: string): string {
        return link.charAt(0) === '/' ? link.length > 1 ? link.substring(1, link.length) : '' : link;
    }


    public static sanitizeUrl(endpoint?: string, url?: string): string {
        if (endpoint.includes('http://') || (endpoint.includes('https://'))) {
            if (url) {
                if (endpoint.includes(url)) {
                    return endpoint;
                } else {
                    return url.includes('https://') ? 'https://' +
                        endpoint.replace(/(^\w+:|^)\/\//, '') : 'http://' +
                        endpoint.replace(/(^\w+:|^)\/\//, '');
                }
            } else {
                return endpoint;
            }
        } else {
            if (url) {
                return AbstractResourceProvider.addLastSlash(url) + AbstractResourceProvider.removeFirstSlash(endpoint);
            } else {
                throw Error('No define endpoint');
            }
        }
    }

    public get$<T>(endpoint?: string, url ?: string, params ?: Params, headers ?: Headers,
                   responseType ?: ResponseType, observe ?: Observe): Observable<T> {
        return this.httpClient.get<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            {
                headers,
                params,
                responseType,
                observe
            });
    }

    public post$<T>(endpoint?: string, url ?: string, body ?: object, params ?: Params, headers ?: Headers,
                    responseType ?: ResponseType, observe ?: Observe): Observable<T> {
        return this.httpClient.post<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            body,
            {
                headers,
                params,
                responseType,
                observe
            });
    }

    public postEvent$(endpoint?: string, url ?: string, body ?: object, params ?: Params): Observable<any> {
        return this.httpClient.post(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            body,
            {
                params,
                reportProgress: true,
                observe: 'events'
            });
    }

    public put$<T>(endpoint?: string, url ?: string, body ?: object, params ?: Params, headers ?: Headers,
                   responseType ?: ResponseType, observe ?: Observe): Observable<T> {
        return this.httpClient.put<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            body,
            {
                headers,
                params,
                responseType,
                observe
            });
    }

    public delete$<T>(endpoint?: string, url?: string, params ?: Params, headers ?: Headers,
                      responseType ?: ResponseType, observe ?: Observe): Observable<T> {
        return this.httpClient.delete<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url), {
            headers,
            params,
            responseType,
            observe
        });
    }

}

@Injectable({
    providedIn: 'root'
})
export class ResourceProvider extends AbstractResourceProvider {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

}
