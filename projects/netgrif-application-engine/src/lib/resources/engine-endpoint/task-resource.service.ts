import {ConfigurationService} from '../../configuration/configuration.service';
import {Injectable} from '@angular/core';
import {ResourceProvider} from '../resource-provider.service';
import {Observable} from 'rxjs';
import {Count} from '../interface/count';
import {changeType, getResourceAddress} from '../resource-utility-functions';
import {MessageResource} from '../interface/message-resource';
import {map} from 'rxjs/operators';
import {TaskReference} from '../interface/task-reference';
import {DataGroupsResource} from '../interface/data-groups';
import {Task} from '../interface/task';
import {ChangedFieldContainer} from '../interface/changed-field-container';
import {CountService} from '../abstract-endpoint/count-service';
import {Filter} from '../../filter/models/filter';
import {FilterType} from '../../filter/models/filter-type';

@Injectable({
    providedIn: 'root'
})
export class TaskResourceService implements CountService {
    private SERVER_URL: string;

    protected constructor(protected provider: ResourceProvider, protected _configService: ConfigurationService) {
        this.SERVER_URL = getResourceAddress('task', this._configService.get().providers.resources);
    }

    /**
     *  Count tasks by provided criteria
     *  POST
     *  {{baseUrl}}/api/task/count
     */
    public countTask(filter: Filter): Observable<Count> {
        if (filter.type !== FilterType.TASK) {
            throw new Error('Provided filter doesn\'t have type TASK');
        }
        return this.provider.post$('task/count', this.SERVER_URL, filter.getRequestBody(), filter.getRequestParams())
            .pipe(map(r => changeType(r, undefined)));
    }

    public count(filter: Filter): Observable<Count> {
        return this.countTask(filter);
    }

    /**
     * Get all tasks
     * GET
     * {{baseUrl}}/api/task
     */
    public getAllTask(): Observable<Array<Task>> {
        return this.provider.get$('task', this.SERVER_URL)
            .pipe(map(r => changeType(r, 'tasks')));
    }

    /**
     * Assign task
     * GET
     */
    // {{baseUrl}}/api/task/assign/:id
    public assignTask(taskId: string): Observable<MessageResource> {
        return this.provider.get$('task/assign/' + taskId, this.SERVER_URL)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Cancel task
     * GET
     */
    // {{baseUrl}}/api/task/cancel/:id
    public cancelTask(taskId: string): Observable<MessageResource> {
        return this.provider.get$('task/cancel/' + taskId, this.SERVER_URL)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Delegate task
     * POST
     */
    // {{baseUrl}}/api/task/delegate/:id
    public delegateTask(taskId: string, body: object): Observable<MessageResource> {
        return this.provider.post$('task/delegate/' + taskId, this.SERVER_URL, body)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Finish task
     * GET
     */
    // {{baseUrl}}/api/task/finish/:id
    public finishTask(taskId: string): Observable<MessageResource> {
        return this.provider.get$('task/finish/' + taskId, this.SERVER_URL)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Searches tasks trough the Elastic endpoint.
     * POST
     * @param filter filter used to search the tasks. Must be of type `TASK`.
     */
    // {{baseUrl}}/api/task/search_es
    public searchTask(filter: Filter): Observable<Array<Task>> {
        if (filter.type !== FilterType.TASK) {
            throw new Error('Provided filter doesn\'t have type TASK');
        }
        return this.provider.post$('task/search_es', this.SERVER_URL, filter.getRequestBody(), filter.getRequestParams())
            .pipe(map(r => changeType(r, 'tasks')));
    }

    /**
     * Searches tasks trough the Mongo endpoint.
     * POST
     * @param body request body
     */
    // {{baseUrl}}/api/task/search
    public getTasks(body: object): Observable<Array<Task>> {
        return this.provider.post$('task/search', this.SERVER_URL, body)
            .pipe(map(r => changeType(r, 'tasks')));
    }

    // ----------- CASE ----------
    /**
     * Get all tasks by cases
     * POST
     */
    // {{baseUrl}}/api/task/case
    public getAllTasksByCases(body: object): Observable<Array<Task>> { // TODO: ??
        return this.provider.post$('task/case', this.SERVER_URL, body)
            .pipe(map(r => changeType(r, 'tasks')));
    }

    /**
     * Get tasks of the case
     * GET
     */
    // {{baseUrl}}/api/task/case/:id
    public getAllTasksByCase(caseId: string): Observable<Array<TaskReference>> {
        return this.provider.get$('task/case/' + caseId, this.SERVER_URL)
            .pipe(map(r => changeType(r, undefined)));
    }

    // ----------- MY Task ----------
    /**
     * Get all tasks assigned to logged user
     * GET
     */
    // {{baseUrl}}/api/task/my
    public getAllMyTasks(): Observable<Array<Task>> {
        return this.provider.get$('task/my', this.SERVER_URL)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get all finished tasks by logged user
     * GET
     */
    // {{baseUrl}}/api/task/my/finished
    public getAllFinishedTask(): Observable<Array<Task>> {
        return this.provider.get$('task/my/finished', this.SERVER_URL)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get all task data
     * GET
     */
    // {{baseUrl}}/api/task/:id/data
    public getData(taskId: string): Observable<Array<DataGroupsResource>> {
        return this.provider.get$('task/' + taskId + '/data', this.SERVER_URL)
            .pipe(map(r => changeType(r, 'dataGroups')));
    }

    /**
     * Set task data
     * POST
     */
    // {{baseUrl}}/api/task/:id/data
    public setData(taskId: string, body: object): Observable<ChangedFieldContainer> {
        return this.provider.post$('task/' + taskId + '/data', this.SERVER_URL, body)
            .pipe(map(r => changeType(r, undefined)));
    }

    // ------------- FILE ------------
    /**
     * Download task file field value
     * GET
     */
    // {{baseUrl}}/api/task/:id/file/:field
    public downloadFile(taskId: string, fieldId: string): Observable<Blob> {
        return this.provider.getBlob$('task/' + taskId + '/file/' + fieldId, this.SERVER_URL)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Upload file into the task
     * POST
     */
    // {{baseUrl}}/api/task/:id/file/:field
    public uploadFile(taskId: string, fieldId: string, body: object): Observable<any> {
        return this.provider.postEvent$('task/' + taskId + '/file/' + fieldId, this.SERVER_URL, body)
            .pipe(map(r => changeType(r, undefined)));
    }
}
