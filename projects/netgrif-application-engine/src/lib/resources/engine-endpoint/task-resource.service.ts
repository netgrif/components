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
import {FileResource} from '../interface/file-resource';

@Injectable({
    providedIn: 'root'
})
export class TaskResourceService {
    private SERVER_URL: string;

    protected constructor(protected provider: ResourceProvider, protected _configService: ConfigurationService) {
        this.SERVER_URL = getResourceAddress('task', this._configService.get().providers.resources);
    }

    /**
     *  Count tasks by provided criteria
     *  POST
     *  {{baseUrl}}/api/task/count
     */
    public countTask(body: object): Observable<Count> {
        return this.provider.post$('task/count', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get all tasks
     * GET
     * {{baseUrl}}/api/task
     */
    public getAllTask(): Observable<Array<Task>> {
        return this.provider.get$('task', this.SERVER_URL).pipe(map(r => changeType(r, 'tasks')));
    }

    /**
     * Assign task
     * GET
     */
    // {{baseUrl}}/api/task/assign/:id
    public assignTask(taskId: string): Observable<MessageResource> {
        return this.provider.get$('task/assign/' + taskId, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Cancel task
     * GET
     */
    // {{baseUrl}}/api/task/cancel/:id
    public cancelTask(taskId: string): Observable<MessageResource> {
        return this.provider.get$('task/cancel/' + taskId, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Delegate task
     * POST
     */
    // {{baseUrl}}/api/task/delegate/:id
    public delegateTask(taskId: string, body: object): Observable<MessageResource> {
        return this.provider.post$('task/delegate/' + taskId, this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Finish task
     * GET
     */
    // {{baseUrl}}/api/task/finish/:id
    public finishTask(taskId: string): Observable<MessageResource> {
        return this.provider.get$('task/finish/' + taskId, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Generic task search
     * POST
     */
    // {{baseUrl}}/api/task/search
    public searchTask(body: object): Observable<Array<Task>> {
        return this.provider.post$('task/search', this.SERVER_URL, body).pipe(map(r => changeType(r, 'tasks')));
    }

    // ----------- CASE ----------
    /**
     * Get all tasks by cases
     * POST
     */
    // {{baseUrl}}/api/task/case
    public getAllTasksByCases(body: object): Observable<Array<Task>> { // TODO: ??
        return this.provider.post$('task/case', this.SERVER_URL, body).pipe(map(r => changeType(r, 'tasks')));
    }

    /**
     * Get tasks of the case
     * GET
     */
    // {{baseUrl}}/api/task/case/:id
    public getAllTasksByCase(caseId: string): Observable<Array<TaskReference>> {
        return this.provider.get$('task/case/' + caseId, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
    }

    // ----------- MY Task ----------
    /**
     * Get all tasks assigned to logged user
     * GET
     */
    // {{baseUrl}}/api/task/my
    public getAllMyTasks(): Observable<Array<Task>> {
        return this.provider.get$('task/my', this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get all finished tasks by logged user
     * GET
     */
    // {{baseUrl}}/api/task/my/finished
    public getAllFinishedTask(): Observable<Array<Task>> {
        return this.provider.get$('task/my/finished', this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get all task data
     * GET
     */
    // {{baseUrl}}/api/task/:id/data
    public getData(taskId: string): Observable<Array<DataGroupsResource>> {
        return this.provider.get$('task/' + taskId + '/data', this.SERVER_URL).pipe(map(r => changeType(r, 'dataGroups')));
    }

    /**
     * Set task data
     * POST
     */
    // {{baseUrl}}/api/task/:id/data
    public setData(taskId: string, body: object): Observable<ChangedFieldContainer> {
        return this.provider.post$('task/' + taskId + '/data', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
    }

    // ------------- FILE ------------
    /**
     * Download task file field value
     * GET
     */
    // {{baseUrl}}/api/task/:id/file/:field
    public downloadFile(taskId: string, fieldId: string): Observable<FileResource> {
        return this.provider.get$('task/' + taskId + '/file/' + fieldId, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Upload file into the task
     * POST
     */
    // {{baseUrl}}/api/task/:id/file/:field
    public uploadFile(taskId: string, fieldId: string, body: object): Observable<MessageResource> {
        return this.provider.post$('task/' + taskId + '/file/' + fieldId, this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
    }
}
