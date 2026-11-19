import {Injectable} from '@angular/core';
import {
    HttpBackend,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, delay, map, shareReplay, switchMap} from 'rxjs/operators';
import {OFFLINE_ENGINE_ADDRESS} from './playground-configuration.service';
import {MockEngine} from '../mock-engine/mock-engine';

/**
 * Responses recorded from a running engine: `"METHOD path"` -> response body, e.g.
 * `{"POST workflow/case/search": {...}}`. They take precedence over the mock engine.
 */
export type RecordedResponses = { [methodAndPath: string]: any };

/** File with the recorded responses, `{}` when nothing was recorded. */
export const RECORDED_RESPONSES_URL = 'assets/mock-engine/recorded.json';

/**
 * The playground has no backend. Requests to the engine never leave the browser:
 * 1. a response recorded from a real engine ({@link RECORDED_RESPONSES_URL}) is returned when there is one,
 * 2. otherwise the in-memory {@link MockEngine} answers (cases, tasks, task forms, task events),
 * 3. endpoints neither of them knows get an empty page and are logged, so missing mocks are easy to spot.
 */
@Injectable()
export class OfflineHttpInterceptor implements HttpInterceptor {

    private readonly _engine = new MockEngine();
    private readonly _recorded$: Observable<RecordedResponses>;

    constructor(backend: HttpBackend) {
        // loaded with the raw backend, so the request does not come back to this interceptor
        this._recorded$ = backend.handle(new HttpRequest('GET', RECORDED_RESPONSES_URL)).pipe(
            map(event => (event instanceof HttpResponse ? event.body as RecordedResponses : undefined)),
            catchError(() => of({})),
            map(recorded => recorded ?? {}),
            shareReplay(1),
        );
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (!request.url.startsWith(OFFLINE_ENGINE_ADDRESS)) {
            return next.handle(request);
        }
        const path = request.url.substring(OFFLINE_ENGINE_ADDRESS.length).replace(/^\/+/, '').split('?')[0];
        return this._recorded$.pipe(
            switchMap(recorded => from(this.readBody(request.body)).pipe(map(body => ({recorded, body})))),
            switchMap(({recorded, body}) => {
                const key = `${request.method} ${path}`;
                if (key in recorded) {
                    return this.respond(request, 200, recorded[key]);
                }
                const response = this._engine.handle({method: request.method, path, params: request.params, body,
                    headers: request.headers});
                if (response) {
                    return this.respond(request, response.status ?? 200, response.body);
                }
                console.debug(`[playground] offline, ${key} is not mocked`);
                return this.respond(request, 200, {content: [], _embedded: {}, page: {size: 0, totalElements: 0, totalPages: 0, number: 0}});
            }),
        );
    }

    /**
     * A multipart body (file upload) as an object for the mock engine: `files` (the parts "file" / "files") and `data`
     * (the JSON part "data", read asynchronously). Other bodies are passed as they are.
     */
    private async readBody(body: unknown): Promise<unknown> {
        if (!(body instanceof FormData)) {
            return body;
        }
        const files = [...body.getAll('file'), ...body.getAll('files')].filter(part => part instanceof Blob) as Array<File>;
        const data = body.get('data');
        let json: unknown;
        try {
            json = data instanceof Blob ? JSON.parse(await data.text()) : data ? JSON.parse(String(data)) : undefined;
        } catch {
            json = undefined;
        }
        return {files, data: json};
    }

    /** a short delay, so loading states of the components are visible like with a real engine */
    private respond(request: HttpRequest<unknown>, status: number, body: any): Observable<HttpEvent<unknown>> {
        if (status >= 400) {
            return throwError(() => new HttpErrorResponse({status, url: request.url, error: body})).pipe(delay(150));
        }
        return of(new HttpResponse({status, url: request.url, body: structuredClone(body)})).pipe(delay(150));
    }
}
