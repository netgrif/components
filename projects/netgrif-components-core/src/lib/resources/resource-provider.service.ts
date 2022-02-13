import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpProgressEvent, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MessageResource} from './interface/message-resource';


export type Headers =
    HttpHeaders | {
    [header: string]: string | Array<string>;
};

export type Params = HttpParams | ObjectParams;

export type ResponseType = 'json' | 'hal';

export interface ObjectParams {
    [param: string]: string | Array<string>;
}

export enum ProgressType {
    UPLOAD = 'upload',
    DOWNLOAD = 'download'
}

export interface ProviderProgress {
    type: ProgressType;
    loaded: number;
    total?: number;
    progress?: number;
}


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

    /**
     * Combines two instances of {@link Params} type into one.
     * If a parameter is declared in both instances uses the value of the `highPriorityParams` in the result.
     * @param highPriorityParams parameters with the higher priority
     * @param lowPriorityParams parameters with the lower priority
     * @returns combination of botch parameters. Uses the value of the higher priority parameters if the keys are in conflict.
     */
    public static combineParams(highPriorityParams: Params, lowPriorityParams: Params): HttpParams {
        const importantParams = highPriorityParams instanceof HttpParams ?
            ResourceProvider.convertHttpParamsToObjectParams(highPriorityParams) :
            highPriorityParams;
        const params = lowPriorityParams instanceof HttpParams ?
            ResourceProvider.convertHttpParamsToObjectParams(lowPriorityParams) :
            {...lowPriorityParams};
        Object.assign(params, importantParams);
        return new HttpParams({fromObject: params});
    }

    /**
     * Converts {@link HttpParams} instance into a simple object.
     * @param params instance to convert
     * @returns simple object with keys and values from the input argument
     */
    public static convertHttpParamsToObjectParams(params: HttpParams): ObjectParams {
        const result = {};
        params.keys().forEach(key => {
            const values = params.getAll(key);
            if (values.length === 1) {
                result[key] = values[0];
            } else {
                result[key] = values;
            }
        });
        return result;
    }

    public static getProgress(event: HttpProgressEvent): ProviderProgress {
        return {
            type: event.type === HttpEventType.UploadProgress ? ProgressType.UPLOAD : ProgressType.DOWNLOAD,
            loaded: event.loaded,
            total: event.total,
            progress: event.loaded && event.total ? Math.round(event.loaded * 100 / event.total) : undefined
        };
    }

    public static processMessageResource(response: MessageResource | HttpResponse<MessageResource>): MessageResource {
        const resource: MessageResource = (response as HttpResponse<MessageResource>).type === HttpEventType.Response ?
            (response as HttpResponse<MessageResource>).body : response as MessageResource;
        if (!!resource && resource.error) {
            throw new Error(resource.error);
        }
        return resource;
    }

    public get$<T>(endpoint?: string, url ?: string, params ?: Params, headers ?: Headers,
                   responseType ?: ResponseType): Observable<T> {
        return this.httpClient.get<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            {
                headers,
                params,
                responseType: 'json',
                observe: 'body'
            });
    }

    public getBlob$(endpoint?: string, url ?: string, params ?: Params, headers?: Headers): Observable<HttpEvent<Blob>> {
        return this.httpClient.get(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            {
                params,
                headers,
                observe: 'events',
                responseType: 'blob',
                reportProgress: true
            });
    }

    public post$<T>(endpoint?: string, url ?: string, body ?: object, params ?: Params, headers ?: Headers,
                    responseType ?: ResponseType): Observable<T> {
        return this.httpClient.post<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            body,
            {
                headers,
                params,
                responseType: 'json',
                observe: 'body'
            });
    }

    public postWithEvent$<T>(endpoint?: string, url ?: string, body ?: object, params ?: Params, headers?: Headers,
                             responseType ?: ResponseType): Observable<HttpEvent<T>> {
        return this.httpClient.post<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            body,
            {
                params,
                headers,
                responseType: 'json',
                observe: 'events',
                reportProgress: true
            });
    }

    public put$<T>(endpoint?: string, url ?: string, body ?: object, params ?: Params, headers ?: Headers,
                   responseType ?: ResponseType): Observable<T> {
        return this.httpClient.put<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url),
            body,
            {
                headers,
                params,
                responseType: 'json',
                observe: 'body'
            });
    }

    public delete$<T>(endpoint?: string, url?: string, params ?: Params, headers ?: Headers,
                      responseType ?: ResponseType): Observable<T> {
        return this.httpClient.delete<T>(AbstractResourceProvider.sanitizeUrl(endpoint, url), {
            headers,
            params,
            responseType: 'json',
            observe: 'body'
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
