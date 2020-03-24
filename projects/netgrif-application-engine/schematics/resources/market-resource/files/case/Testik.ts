// import {Injectable} from '@angular/core';
// import {Case, changeType, Count, MessageResource, ResourceProvider} from 'netgrif-application-engine';
// import {Observable} from 'rxjs';
// import {map} from 'rxjs/operators';
//
// @Injectable({
//     providedIn: 'root'
// })
// export abstract class AbstractCaseJsonResourceService {
//
//     protected constructor(protected provider: ResourceProvider, protected SERVER_URL: string) {
//     }
//
//     /**
//      * Get count of the cases
//      * POST
//      * {{baseUrl}}/api/workflow/case/count
//      */
//     public countCase(body: object): Observable<Count> {
//         return this.provider.post$('workflow/case/count', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
//     }
//
//     /**
//      * Get all cases of the system
//      * GET
//      * {{baseUrl}}/api/workflow/all
//      */
//     public getAllCase(): Observable<Array<Case>> {
//         return this.provider.get$('workflow/all', this.SERVER_URL).pipe(map(r => changeType(r, 'cases')));
//     }
//
//     /**
//      * Generic case search
//      * POST
//      * {{baseUrl}}/api/workflow/case/search
//      */
//     public getCase(): Observable<Array<Case>> {
//         return this.provider.get$('workflow/case/search', this.SERVER_URL).pipe(map(r => changeType(r, 'counts')));
//     }
//
//
//     /**
//      * Delete case
//      * DELETE
//      * {{baseUrl}}/api/workflow/case/:id
//      */
//     public deleteCase(caseID: string): Observable<MessageResource> {
//         return this.provider.delete$('workflow/case/' + caseID, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
//     }
//
//
//     /**
//      * Get all case data
//      * GET
//      * {{baseUrl}}/api/workflow/case/:id/data
//      */
//     public getCaseData(caseID: string): Observable<Case> {  // TODO DATAFIELDRESOURCE!!!
//         return this.provider.get$('workflow/case/' + caseID + '/data', this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
//     }
//
//
//     /**
//      * Download case file field value
//      * GET
//      * {{baseUrl}}/api/workflow/case/:id/file/:field
//      */
//     public getCaseFile(caseID: string, fieldID: string): Observable<Case> { // TODO RESOURCE
//         return this.provider.get$('workflow/case/' + caseID + '/file/' + fieldID, this.SERVER_URL)
//         .pipe(map(r => changeType(r, undefined)));
//     }
//
//
//     /**
//      * Create new case
//      * POST
//      * {{baseUrl}}/api/workflow/case
//      */
//     public createCase(body: object): Observable<Case> {
//         return this.provider.post$('workflow/case/', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
//     }
//
//     /**
//      * Get all cases by user that created them
//      * POST
//      * {{baseUrl}}/api/workflow/case/author/:id
//      */
//     public getAllCaseUser(body: object): Observable<Array<Case>> {
//         return this.provider.post$('workflow/case/', this.SERVER_URL, body).pipe(map(r => changeType(r, 'cases')));
//     }
//
//
//     /**
//      * Generic case search with QueryDSL predicate
//      * POST
//      * {{baseUrl}}/api/workflow/case/search2
//      */
//     public getCasesQueryDSL(body: object): Observable<Array<Case>> {
//         return this.provider.post$('workflow/case/', this.SERVER_URL, body).pipe(map(r => changeType(r, 'cases')));
//     }
//
//
//     /**
//      * Get options for enumeration or multiple-choice data field
//      * GET
//      * {{baseUrl}}/api/workflow/case/:caseId/field/:fieldId
//      */
//     public getOptionsEnumeration(caseId: string, fieldId: string): Observable<Case> {
//         return this.provider.get$('workflow/case/' + caseId + '/field/' + fieldId, this.SERVER_URL)
//         .pipe(map(r => changeType(r, undefined)));
//     }
//
// }
//
// export class CaseJsonResourceService extends AbstractCaseJsonResourceService {
//     constructor(provider: ResourceProvider) {
//         super(provider, '<%= url %>');
//     }
// }
