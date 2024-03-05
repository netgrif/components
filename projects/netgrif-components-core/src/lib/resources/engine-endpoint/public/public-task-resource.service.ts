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
import {TaskSetDataRequestBody} from '../../interface/task-set-data-request-body';
import {TaskReference} from '../../interface/task-reference';
import {Task} from '../../interface/task';
import {HttpEventType, HttpParams} from '@angular/common/http';
import {EventOutcomeMessageResource, MessageResource} from '../../interface/message-resource';
import {FileFieldRequest} from "../../interface/file-field-request-body";

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
    public setData(taskId: string, body: TaskSetDataRequestBody): Observable<EventOutcomeMessageResource> {
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
    public downloadFile(taskId: string, params: HttpParams): Observable<ProviderProgress | Blob> {
        // const url = !!params.has("fileName") ? 'task/' + taskId + '/file/named' : 'task/' + taskId + '/file';
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
    public uploadFile(taskId: string, body: object, multipleFiles: boolean):
        Observable<ProviderProgress | EventOutcomeMessageResource> {
        // const url = !multipleFiles ? 'public/task/' + taskId + "/file" : 'public/task/' + taskId + '/files';
        const url = `public/task/${taskId}/${multipleFiles ? 'files' : 'file'}`;
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
    public deleteFile(taskId: string, body: FileFieldRequest): Observable<MessageResource> {
        // const url = !!body.fileName ? 'public/task/' + taskId + '/file/named' : 'public/task/' + taskId + '/file';
        const url = `public/task/${taskId}/file${body.fileName ? '/named' : ''}`;
        return this._resourceProvider.delete$(url, this.SERVER_URL, {}, {}, 'json', body).pipe(
            map(r => this.changeType(r, undefined))
        );
    }

    /**
     * Download task file preview for field value
     * GET
     */
    public downloadFilePreview(taskId: string, params: HttpParams): Observable<ProviderProgress | Blob> {
        // const url = 'public/task/' + taskId + '/file_preview';
        const url = `public/task/${taskId}/file_preview`;
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
