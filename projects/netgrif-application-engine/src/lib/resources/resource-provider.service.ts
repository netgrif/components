import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Resources} from "../configuration/interfaces/schema";
import {ConfigurationService} from "../configuration/configuration.service";
import {Injectable} from "@angular/core";


export type Observe =
    'body'
export type Headers =
    HttpHeaders | {
    [header: string]: string | string[];
}

export type Params =
    HttpParams | {
    [param: string]: string | string[];
}

export type ResponseType =
    'json'


export abstract class AbstractResourceProvider {

    protected constructor(private httpClient: HttpClient, private configuration: ConfigurationService) {
    }

    private static addLastSlash(string: string): string {
        if (string.length > 0) {
            return string.substr(string.length - 1) === '/' ? string : string + "/";
        } else {
            throw Error("No define api url")
        }
    }

    private static removeFirstSlash(string: string): string {
        return string.substr(0) === '/' ? string.length > 1 ? string.substring(1, string.length - 1) : "" : string;
    }


    private sanitizeUrl(endpoint?: string, resourceName?: string): string {
        if (endpoint.includes("http://") || (endpoint.includes("https://"))) {
            return endpoint
        } else {
            let configResources: Resources = this.configuration.get().resources;
            if (configResources instanceof Array) {
                configResources.forEach(i => {
                    if (i.name === resourceName) {
                        if (endpoint.includes(i.address)) {
                            return endpoint;
                        } else {
                            return AbstractResourceProvider.addLastSlash(i.address) + AbstractResourceProvider.removeFirstSlash(endpoint);
                        }
                    }
                });
                throw Error("No define endpoint")
            } else {
                if (configResources.name === resourceName) {
                    if (endpoint.includes(configResources.address)) {
                        return endpoint;
                    } else {
                        return AbstractResourceProvider.addLastSlash(configResources.address) + AbstractResourceProvider.removeFirstSlash(endpoint);
                    }
                } else {
                    throw Error("No define endpoint")
                }
            }
        }
    }


    public get$<T>(endpoint?: string, name?: string, headers?: Headers, params?: Params, responseType?: ResponseType, observe?: Observe): Observable<T> {
        return this.httpClient.get<T>(this.sanitizeUrl(endpoint, name), {
            headers: headers,
            params: params,
            responseType: responseType,
            observe: observe
        });
    }

    public post$<T>(endpoint?: string, name?: string, body?: object, headers?: Headers, params?: Params, responseType?: ResponseType, observe?: Observe): Observable<T> {
        return this.httpClient.post<T>(this.sanitizeUrl(name, endpoint),
            body,
            {
                headers: headers,
                params: params,
                responseType: responseType,
                observe: observe
            });
    }

    public put$<T>(endpoint?: string, name?: string, body?: object, headers?: Headers, params?: Params, responseType?: ResponseType, observe?: Observe): Observable<T> {
        return this.httpClient.put<T>(this.sanitizeUrl(name, endpoint),
            body,
            {
                headers: headers,
                params: params,
                responseType: responseType,
                observe: observe
            });
    }

    public delete$<T>(endpoint?: string, name?: string, headers?: Headers, params?: Params, responseType?: ResponseType, observe?: Observe): Observable<T> {
        return this.httpClient.delete<T>(this.sanitizeUrl(name, endpoint), {
            headers: headers,
            params: params,
            responseType: responseType,
            observe: observe
        });
    }

}

@Injectable({
    providedIn: 'root'
})
export class ResourceProvider extends AbstractResourceProvider {
}
