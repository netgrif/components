import {Injectable} from '@angular/core';
import {TaskResourceService} from '../task-resource.service';
import {FieldConverterService} from '../../../task-content/services/field-converter.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {Params, ProviderProgress, ResourceProvider} from '../../resource-provider.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {FilterType} from '../../../filter/models/filter-type';
import {Filter} from '../../../filter/models/filter';
import {Page} from '../../interface/page';
import {TaskDataSets} from '../../interface/task-data-sets';
import {TaskReference} from '../../interface/task-reference';
import {Task} from '../../interface/task';
import {HttpEventType, HttpParams} from '@angular/common/http';
import {EventOutcomeMessageResource, MessageResource} from '../../interface/message-resource';

@Injectable({
    providedIn: 'root'
})
export class PublicTaskResourceService extends TaskResourceService {

    constructor(protected _provider: ResourceProvider,
                protected _configService: ConfigurationService,
                protected _fieldConverter: FieldConverterService,
                protected _logger: LoggerService) {
        super(_provider, _configService, _fieldConverter, _logger);
    }

    /**
     * Assign task
     * GET
     */
    // {{baseUrl}}/api/public/task/assign/:id
    public assignTask(taskId: string): Observable<EventOutcomeMessageResource> {
        return this._provider.get$('public/task/assign/' + taskId, this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Cancel task
     * GET
     */
    // {{baseUrl}}/api/public/task/cancel/:id
    public cancelTask(taskId: string): Observable<EventOutcomeMessageResource> {
        return this._provider.get$('public/task/cancel/' + taskId, this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Finish task
     * GET
     */
    // {{baseUrl}}/api/public/task/finish/:id
    public finishTask(taskId: string): Observable<EventOutcomeMessageResource> {
        return this._provider.get$('public/task/finish/' + taskId, this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Get tasks of the case
     * GET
     */
    // {{baseUrl}}/api/public/task/case/:id
    public getAllTasksByCase(caseId: string): Observable<Array<TaskReference>> {
        return this._provider.get$('public/task/case/' + caseId, this.SERVER_URL)
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
    // {{baseUrl}}/api/public/task/:id/data
    public rawGetData(taskId: string): Observable<EventOutcomeMessageResource> {
        return this._provider.get$('public/task/' + taskId + '/data', this.SERVER_URL)
            .pipe(map(r => this.changeType(r, 'dataGroups')));
    }

    /**
     * Set task data
     * POST
     */
    // {{baseUrl}}/api/public/task/:id/data
    public setData(taskId: string, body: TaskDataSets): Observable<EventOutcomeMessageResource> {
        return this._provider.post$('public/task/' + taskId + '/data', this.SERVER_URL, body)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Searches tasks trough the Mongo endpoint.
     * POST
     * @param filterParam filter used to search the tasks. Must be of type `TASK`.
     * Note that the `query` attribute of the filter cannot be used with this endpoint.
     * Attempting to use it will display a warning and remove the attribute from the request.
     * @param params Additional request parameters
     */
    // {{baseUrl}}/api/public/task/search
    public getTasks(filterParam: Filter, params?: Params): Observable<Page<Task>> {
        if (filterParam.type !== FilterType.TASK) {
            throw new Error('Provided filter doesn\'t have type TASK');
        }

        if (filterParam.bodyContainsQuery()) {
            throw new Error('getTasks endpoint cannot be queried with filters that contain the \'query\' attribute');
        }

        params = ResourceProvider.combineParams(filterParam.getRequestParams(), params);
        return this._provider.post$('public/task/search', this.SERVER_URL, filterParam.getRequestBody(), params)
            .pipe(map(r => this.getResourcePage<Task>(r, 'tasks')));
    }

    /**
     * Download task file field value
     * GET
     */
    // {{baseUrl}}/api/task/:id/file/:field         - for file field
    // {{baseUrl}}/api/task/:id/file/:field/:name   - for file list field
    public downloadFile(taskId: string, fieldId: string, name?: string): Observable<ProviderProgress | Blob> {
        const url = !!name ? `public/task/${taskId}/file/${fieldId}/${name}` : `public/task/${taskId}/file/${fieldId}`;
        return this._resourceProvider.getBlob$(url, this.SERVER_URL).pipe(
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
    public uploadFile(taskId: string, fieldId: string, body: object, multipleFiles: boolean):
        Observable<ProviderProgress | EventOutcomeMessageResource> {
        const url = !multipleFiles ? `public/task/${taskId}/file/${fieldId}` : `public/task/${taskId}/files/${fieldId}`;
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
    public deleteFile(taskId: string, fieldId: string, name?: string, param?: HttpParams): Observable<MessageResource> {
        const url = !!name ? `public/task/${taskId}/file/${fieldId}/${name}` : `public/task/${taskId}/file/${fieldId}`;
        return this._resourceProvider.delete$(url, this.SERVER_URL, param).pipe(
            map(r => this.changeType(r, undefined))
        );
    }

    /**
     * Download task file preview for field value
     * GET
     */
    // {{baseUrl}}/api/task/:id/file_preview/:field
    public downloadFilePreview(taskId: string, fieldId: string): Observable<ProviderProgress | Blob> {
        const url = 'public/task/' + taskId + '/file_preview/' + fieldId;
        return this._resourceProvider.getBlob$(url, this.SERVER_URL).pipe(
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
