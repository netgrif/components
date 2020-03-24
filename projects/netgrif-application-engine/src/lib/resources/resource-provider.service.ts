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
                    return url.includes('https://') ? 'https://' + endpoint.replace(/(^\w+:|^)\/\//, '')
                        : 'http://' + endpoint.replace(/(^\w+:|^)\/\//, '');
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

    public get<T>(endpoint?: string, url ?: string, headers ?: Headers, params ?: Params,
                  responseType ?: ResponseType, observe ?: Observe): Observable<T> {
        return this.httpClient.get<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            {
                headers,
                params,
            });
    }

    public post<T>(endpoint?: string, url ?: string, body ?: object, headers ?: Headers, params ?: Params,
                   responseType ?: ResponseType, observe ?: Observe): Observable<T> {
        return this.httpClient.post<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            body,
            {
                headers,
                params,
            });
    }

    public put<T>(endpoint?: string, url ?: string, body ?: object, headers ?: Headers, params ?: Params,
                  responseType ?: ResponseType, observe ?: Observe): Observable<T> {
        return this.httpClient.put<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            body,
            {
                headers,
                params,

            });
    }

    public delete<T>(endpoint?: string, url?: string, headers ?: Headers, params ?: Params,
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

    private auth = new HttpHeaders()
        .set('Authorization', 'Basic c3VwZXJAbmV0Z3JpZi5jb206cGFzc3dvcmQ=');

    public get$<T>(endpoint?: string, url ?: string, headers ?: Headers, params ?: Params, responseType ?: ResponseType,
                   observe ?: Observe): Observable<T> {
        return this.get(endpoint, url, this.auth, params, responseType, observe);
    }


    public post$<T>(endpoint?: string, url ?: string, body ?: object, headers ?: Headers, params ?: Params,
                    responseType ?: ResponseType, observe ?: Observe): Observable<T> {
        return this.post(endpoint, url, body, this.auth, params, responseType, observe);
    }

    public put$<T>(endpoint?: string, url ?: string, body ?: object, headers ?: Headers, params ?: Params,
                   responseType ?: ResponseType, observe ?: Observe): Observable<T> {
        return this.put(endpoint, url, body, this.auth, params, responseType, observe);
    }

    public delete$<T>(endpoint?: string, url?: string, headers ?: Headers, params ?: Params, responseType ?: ResponseType,
                      observe ?: Observe): Observable<T> {
        return this.delete(endpoint, url, this.auth, params, responseType, observe);
    }

}
