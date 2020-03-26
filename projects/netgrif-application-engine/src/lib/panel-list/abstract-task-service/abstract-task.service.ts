import {ResourceProvider} from '../../resources/resource-provider.service';
import {Observable} from 'rxjs';
import {Count} from '../../resources/interface/count';
import {changeType} from '../../resources/resource-utility-functions';
import {map} from 'rxjs/operators';
import {MessageResource} from '../../resources/interface/message-resource';
import {Task} from '../../resources/interface/task';
import {TaskReference} from '../../resources/interface/task-reference';
import {DataGroupsResource} from '../../resources/interface/data-groups';
import {ChangedFieldContainer} from '../../resources/interface/changed-field-container';
import {FileResource} from '../../resources/interface/file-resource';

export abstract class AbstractTaskJsonResourceService {
    protected constructor(protected provider: ResourceProvider, protected SERVER_URL: string) {
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
        return this.provider.get$('task/cancel/' + taskId, this.SERVER_URL).pipe(map(r => changeType(r,  undefined)));
    }

    /**
     * Delegate task
     * POST
     */
    // {{baseUrl}}/api/task/delegate/:id
    public delegateTask(taskId: string, body: object): Observable<Array<Task>> {
        return this.provider.post$('task/delegate' + taskId, this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Finish task
     * GET
     */
    // {{baseUrl}}/api/task/finish/:id
    public finishTask(taskId: string): Observable<Array<Task>> {
        return this.provider.get$('task/finish' + taskId, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
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
