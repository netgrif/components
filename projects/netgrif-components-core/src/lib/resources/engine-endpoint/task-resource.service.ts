import {ConfigurationService} from '../../configuration/configuration.service';
import {Injectable} from '@angular/core';
import {Params, ProviderProgress, ResourceProvider} from '../resource-provider.service';
import {Observable} from 'rxjs';
import {Count} from '../interface/count';
import {EventOutcomeMessageResource} from '../interface/message-resource';
import {filter, map} from 'rxjs/operators';
import {TaskReference} from '../interface/task-reference';
import {Task} from '../interface/task';
import {CountService} from '../abstract-endpoint/count-service';
import {Filter} from '../../filter/models/filter';
import {FilterType} from '../../filter/models/filter-type';
import {HttpEventType, HttpParams} from '@angular/common/http';
import {Page} from '../interface/page';
import {FieldConverterService} from '../../task-content/services/field-converter.service';
import {LoggerService} from '../../logger/services/logger.service';
import {AbstractResourceService} from '../abstract-endpoint/abstract-resource.service';
import {FileFieldRequest} from "../interface/file-field-request-body";
import {TaskDataSets} from '../interface/task-data-sets';

@Injectable({
    providedIn: 'root'
})
export class TaskResourceService extends AbstractResourceService implements CountService {

    constructor(provider: ResourceProvider,
                configService: ConfigurationService,
                protected _fieldConverter: FieldConverterService,
                protected _logger: LoggerService) {
        super('task', provider, configService);
    }

    /**
     *  Count tasks by provided criteria
     *  POST
     *  {{baseUrl}}/api/task/count
     */
    public count(filterParam: Filter): Observable<Count> {
        if (filterParam.type !== FilterType.TASK) {
            throw new Error('Provided filter doesn\'t have type TASK');
        }
        return this._resourceProvider.post$('task/count', this.SERVER_URL, filterParam.getRequestBody(), filterParam.getRequestParams())
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Get all tasks
     * GET
     * {{baseUrl}}/api/task
     */
    public getAllTask(): Observable<Array<Task>> {
        return this._resourceProvider.get$('task', this.SERVER_URL)
            .pipe(map(r => this.changeType(r, 'tasks')));
    }

    /**
     * Assign task
     * GET
     */
    // {{baseUrl}}/api/task/assign/:id
    public assignTask(taskId: string): Observable<EventOutcomeMessageResource> {
        return this._resourceProvider.get$('task/assign/' + taskId, this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Cancel task
     * GET
     */
    // {{baseUrl}}/api/task/cancel/:id
    public cancelTask(taskId: string): Observable<EventOutcomeMessageResource> {
        return this._resourceProvider.get$('task/cancel/' + taskId, this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Delegate task
     * POST
     */
    // {{baseUrl}}/api/task/delegate/:id
    public delegateTask(taskId: string, body: object): Observable<EventOutcomeMessageResource> {
        return this._resourceProvider.post$('task/delegate/' + taskId, this.SERVER_URL, body, undefined, {'Content-Type': 'text/plain'})
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Finish task
     * GET
     */
    // {{baseUrl}}/api/task/finish/:id
    public finishTask(taskId: string): Observable<EventOutcomeMessageResource> {
        return this._resourceProvider.get$('task/finish/' + taskId, this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Searches tasks trough the Elastic endpoint.
     * POST
     * @param filterParam filter used to search the tasks. Must be of type `TASK`.
     * @param params Additional parameters
     */
    // {{baseUrl}}/api/task/search_es
    public searchTask(filterParam: Filter, params?: Params): Observable<Page<Task>> {
        if (filterParam.type !== FilterType.TASK) {
            throw new Error('Provided filter doesn\'t have type TASK');
        }
        params = ResourceProvider.combineParams(filterParam.getRequestParams(), params);
        return this._resourceProvider.post$('task/search_es', this.SERVER_URL, filterParam.getRequestBody(), params)
            .pipe(map(r => this.getResourcePage<Task>(r, 'tasks')));
    }

    /**
     * Searches tasks trough the Mongo endpoint.
     * POST
     * @param filterParam filter used to search the tasks. Must be of type `TASK`.
     * Note that the `query` attribute of the filter cannot be used with this endpoint.
     * Attempting to use it will display a warning and remove the attribute from the request.
     * @param params Additional request parameters
     */
    // {{baseUrl}}/api/task/search
    public getTasks(filterParam: Filter, params?: Params): Observable<Page<Task>> {
        if (filterParam.type !== FilterType.TASK) {
            throw new Error('Provided filter doesn\'t have type TASK');
        }

        if (filterParam.bodyContainsQuery()) {
            throw new Error('getTasks endpoint cannot be queried with filters that contain the \'query\' attribute');
        }

        params = ResourceProvider.combineParams(filterParam.getRequestParams(), params);
        return this._resourceProvider.post$('task/search', this.SERVER_URL, filterParam.getRequestBody(), params)
            .pipe(map(r => this.getResourcePage<Task>(r, 'tasks')));
    }

    // ----------- CASE ----------
    /**
     * Get all tasks by cases
     * POST
     */
    // {{baseUrl}}/api/task/case
    public getAllTasksByCases(body: object): Observable<Array<Task>> { // TODO: ??
        return this._resourceProvider.post$('task/case', this.SERVER_URL, body)
            .pipe(map(r => this.changeType(r, 'tasks')));
    }

    /**
     * Get tasks of the case
     * GET
     */
    // {{baseUrl}}/api/task/case/:id
    public getAllTasksByCase(caseId: string): Observable<Array<TaskReference>> {
        return this._resourceProvider.get$('task/case/' + caseId, this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    // ----------- MY Task ----------
    /**
     * Get all tasks assigned to logged user
     * GET
     */
    // {{baseUrl}}/api/task/my
    public getAllMyTasks(): Observable<Array<Task>> {
        return this._resourceProvider.get$('task/my', this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Get all finished tasks by logged user
     * GET
     */
    // {{baseUrl}}/api/task/my/finished
    public getAllFinishedTask(): Observable<Array<Task>> {
        return this._resourceProvider.get$('task/my/finished', this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Get all task data
     *
     * GET
     *
     * If you don't want to parse the response yourself use [getData]{@link TaskResourceService#getData} instead.
     *
     * @returns the raw backend response without any additional processing
     */
    // {{baseUrl}}/api/task/:id/data
    public rawGetData(taskId: string): Observable<EventOutcomeMessageResource> {
        return this._resourceProvider.get$('task/' + taskId + '/data', this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     *  Get all task data
     *
     *  GET
     *
     *  If you want to process the raw backend response use [rawGetData]{@link TaskResourceService#rawGetData} instead.
     *
     * @param taskId ID of the task who's data should be retrieved from the server
     * @returns processed data groups of the given task. If the task has no data an empty array will be returned.
     */
    public getData(taskId: string): Observable<EventOutcomeMessageResource> {
        return this.rawGetData(taskId);
    }

    /**
     * Set task data
     * POST
     */
    // {{baseUrl}}/api/task/:id/data
    public setData(taskId: string, body: TaskDataSets): Observable<EventOutcomeMessageResource> {
        return this._resourceProvider.post$('task/' + taskId + '/data', this.SERVER_URL, body)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    // ------------- FILE ------------
    /**
     * Download task file field value
     * GET
     */
    // {{baseUrl}}/api/task/:id/file/:field         - for file field
    // {{baseUrl}}/api/task/:id/file/:field/:name   - for file list field
    public downloadFile(taskId: string, params: HttpParams): Observable<ProviderProgress | Blob> {
        const url = `task/${taskId}/file${params?.has("fileName") ? '/named' : ''}`;
        return this._resourceProvider.getBlob$(url, this.SERVER_URL, params).pipe(
            map(event => {
                switch (event.type) {
                    case HttpEventType.DownloadProgress:
                        return ResourceProvider.getProgress(event);
                    case HttpEventType.Response:
                        return event.body;
                    default:
                        return undefined;
                }
            }),
            filter(value => !!value)
        );
    }

    /**
     * Upload file into the task
     * POST
     */
    // {{baseUrl}}/api/task/:id/file/:field     - for file field
    // {{baseUrl}}/api/task/:id/files/:field    - for file list field
    public uploadFile(taskId: string, body: object, multipleFiles: boolean):
        Observable<ProviderProgress | EventOutcomeMessageResource> {
        const url = `task/${taskId}/${multipleFiles ? 'files' : 'file'}`;
        return this._resourceProvider.postWithEvent$<EventOutcomeMessageResource>(url, this.SERVER_URL, body).pipe(
            map(event => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        return ResourceProvider.getProgress(event);
                    case HttpEventType.Response:
                        return event.body;
                    default:
                        return undefined;
                }
            }),
            filter(value => !!value)
        );
    }

    /**
     * Delete file from the task
     * DELETE
     */
    public deleteFile(taskId: string, body?: FileFieldRequest): Observable<ProviderProgress | EventOutcomeMessageResource> {
        const url = `task/${taskId}/file${body?.fileName ? '/named' : ''}`;
        return this._resourceProvider.delete$<EventOutcomeMessageResource>(url, this.SERVER_URL, {}, {}, 'json', body).pipe(
            map(r => this.changeType(r, undefined))
        );
    }

    /**
     * Download task file preview for field value
     * GET
     */
    // {{baseUrl}}/api/task/:id/file_preview/:field
    public downloadFilePreview(taskId: string, params: HttpParams): Observable<ProviderProgress | Blob> {
        const url = `task/${taskId}/file_preview`;
        return this._resourceProvider.getBlob$(url, this.SERVER_URL, params).pipe(
            map(event => {
                switch (event.type) {
                    case HttpEventType.DownloadProgress:
                        return ResourceProvider.getProgress(event);
                    case HttpEventType.Response:
                        return event.body;
                    default:
                        return undefined;
                }
            }),
            filter(value => !!value)
        );
    }
}
