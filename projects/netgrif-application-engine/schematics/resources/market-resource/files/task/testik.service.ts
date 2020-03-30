// import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs';
// import {map} from 'rxjs/operators';
// import {changeType, Count, Task, ResourceProvider, MessageResource} from 'netgrif-application-engine';
//
// @Injectable({
//     providedIn: 'root'
// })
//
// export abstract class AbstractTaskJsonResourceService {
//     protected constructor(protected provider: ResourceProvider, protected SERVER_URL: string) {
//     }
//
//     /**
//      *  Count tasks by provided criteria
//      *  POST
//      *  {{baseUrl}}/api/task/count
//      */
//     public countTask(body: object): Observable<Count> {
//         return this.provider.post$('task/count', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
//     }
//
//     /**
//      * Get all tasks
//      * GET
//      * {{baseUrl}}/api/task
//      */
//     public getAllTask(): Observable<Array<Task>> {
//         return this.provider.get$('task', this.SERVER_URL).pipe(map(r => changeType(r, 'tasks')));
//     }
//
//     /**
//      * Assign task
//      * GET
//      */
//     // {{baseUrl}}/api/task/assign/:id
//     public assignTask(taskId: string): Observable<MessageResource> {
//         return this.provider.get$('task/assign/' + taskId, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
//     }
//
//     /**
//      * Cancel task
//      * GET
//      */
//     // {{baseUrl}}/api/task/cancel/:id
//     public cancelTask(taskId: string): Observable<MessageResource> {
//         return this.provider.get$('task/cancel/' + taskId, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
//     }
//
//     /**
//      * Delegate task
//      * POST
//      */
//     // {{baseUrl}}/api/task/delegate/:id
//     public delegateTask(taskId: string, body: object): Observable<Array<Task>> {
//         return this.provider.post$('task/delegate' + taskId, this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
//     }
//
//     /**
//      * Finish task
//      * GET
//      */
//     // {{baseUrl}}/api/task/finish/:id
//     public finishTask(taskId: string): Observable<Array<Task>> {
//         return this.provider.get$('task/count' + taskId, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
//     }
//
//     /**
//      * Generic task search
//      * POST
//      */
//     // {{baseUrl}}/api/task/search
//     public searchTask(body: object): Observable<Array<Task>> {
//         return this.provider.post$('task/count', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
//     }
//
//     // ----------- CASE ----------
//
//     /**
//      * Get all tasks by cases
//      * POST
//      */
//     // {{baseUrl}}/api/task/case
//     public getAllTasksByCases(body: object): Observable<Array<Task>> {
//         return this.provider.post$('task/case', this.SERVER_URL, body).pipe(map(r => changeType(r, 'tasks')));
//     }
//
//     /**
//      * Get tasks of the case
//      * GET
//      */
//     // {{baseUrl}}/api/task/case/:id
//     public getAllTasksByCase(caseId: string): Observable<Array<Task>> {
//         return this.provider.get$('task/case/' + caseId, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
//     }
//
//     // ----------- MY Task ----------
//     /**
//      * Get all tasks assigned to logged user
//      * GET
//      */
//     // {{baseUrl}}/api/task/my
//     public getAllMyTasks(): Observable<Array<Task>> {
//         return this.provider.get$('task/my', this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
//     }
//
//     /**
//      * Get all finished tasks by logged user
//      * GET
//      */
//     // {{baseUrl}}/api/task/my/finished
//     public getAllFinishedTask(): Observable<Array<Task>> {
//         return this.provider.get$('task/my/finished', this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
//     }
//
//     /**
//      * Get all task data
//      * GET
//      */
//     // {{baseUrl}}/api/task/:id/data
//     public getData(taskId: string): Observable<Array<Task>> {
//         return this.provider.get$('task/' + taskId + 'data', this.SERVER_URL).pipe(map(r => changeType(r, 'dataGroups')));
//     }
//
//     /**
//      * Set task data
//      * POST
//      */
//     // {{baseUrl}}/api/task/:id/data
//     public setData(taskId: string, body: object): Observable<Array<Task>> {
//         return this.provider.post$('task/' + taskId + '/data', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
//     }
//
//     // ------------- FILE ------------
//     /**
//      * Download task file field value
//      * GET
//      */
//     // {{baseUrl}}/api/task/:id/file/:field
//     public downloadFile(taskId: string, fieldId: string): Observable<Array<Task>> {
//         return this.provider.get$('task/' + taskId + '/file/' + fieldId, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
//     }
//
//     /**
//      * Upload file into the task
//      * POST
//      */
//     // {{baseUrl}}/api/task/:id/file/:field
//     public uploadFile(taskId: string, fieldId: string, body: object): Observable<Array<Task>> {
//         return this.provider.post$('task/' + taskId + '/file/' + fieldId, this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
//     }
// }
//
// export class TaskJsonResourceService extends AbstractTaskJsonResourceService {
//     constructor(provider: ResourceProvider) {
//         super(provider, '<%= url %>');
//     }
// }
