import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Params, ResourceProvider} from '../resource-provider.service';
import {Count} from '../interface/count';
import {Case} from '../interface/case';
import {MessageResource} from '../interface/message-resource';
import {DataGroupsResource} from '../interface/data-groups';
import {FileResource} from '../interface/file-resource';
import {ConfigurationService} from '../../configuration/configuration.service';
import {CountService} from '../abstract-endpoint/count-service';
import {Filter} from '../../filter/models/filter';
import {FilterType} from '../../filter/models/filter-type';
import {Page} from '../interface/page';
import {CaseGetRequestBody} from '../interface/case-get-request-body';
import {AbstractResourceService} from '../abstract-endpoint/abstract-resource.service';
import {CreateCaseRequestBody} from '../interface/create-case-request-body';

@Injectable({
    providedIn: 'root'
})
export class CaseResourceService extends AbstractResourceService implements CountService {

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super('case', provider, configService);
    }

    /**
     * Get count of the cases
     * POST
     * {{baseUrl}}/api/workflow/case/count
     */
    public count(filter: Filter): Observable<Count> {
        if (filter.type !== FilterType.CASE) {
            throw new Error('Provided filter doesn\'t have type CASE');
        }
        return this._resourceProvider.post$('workflow/case/count', this.SERVER_URL, filter.getRequestBody(), filter.getRequestParams())
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Get all cases of the system
     * GET
     * {{baseUrl}}/api/workflow/all
     */
    public getAllCase(): Observable<Array<Case>> {
        return this._resourceProvider.get$('workflow/all', this.SERVER_URL).pipe(map(r => this.changeType(r, 'cases')));
    }

    /**
     * Generic case search
     * POST
     * {{baseUrl}}/api/workflow/case/search
     * @param filter filter used to search cases. Must be of type `CASE`.
     * @param params request parameters, that can be used for sorting of results.
     */
    public searchCases(filter: Filter, params?: Params): Observable<Page<Case>> {
        if (filter.type !== FilterType.CASE) {
            throw new Error('Provided filter doesn\'t have type CASE');
        }
        params = ResourceProvider.combineParams(filter.getRequestParams(), params);
        return this._resourceProvider.post$('workflow/case/search', this.SERVER_URL, filter.getRequestBody(), params)
            .pipe(map(r => this.getResourcePage<Case>(r, 'cases')));
    }


    /**
     * Delete case
     * DELETE
     * {{baseUrl}}/api/workflow/case/:id
     */
    public deleteCase(caseID: string, deleteSubtree: boolean = false): Observable<MessageResource> {
        return this._resourceProvider.delete$('workflow/case/' + caseID,
            this.SERVER_URL,
            deleteSubtree ? {deleteSubtree: deleteSubtree.toString()} : {})
            .pipe(map(r => this.changeType(r, undefined)));
    }


    /**
     * Get all case data
     * GET
     * {{baseUrl}}/api/workflow/case/:id/data
     */
    public getCaseData(caseID: string): Observable<Array<DataGroupsResource>> {
        return this._resourceProvider.get$('workflow/case/' + caseID + '/data', this.SERVER_URL).pipe(
            map(r => this.changeType(r, 'dataGroups'))
        );
    }


    /**
     * Download case file field value
     * GET
     * {{baseUrl}}/api/workflow/case/:id/file/:field
     */
    public getCaseFile(caseID: string, fieldID: string): Observable<FileResource> {
        return this._resourceProvider.get$('workflow/case/' + caseID + '/file/' + fieldID, this.SERVER_URL).pipe(
            map(r => this.changeType(r, undefined))
        );
    }


    /**
     * Create new case
     * POST
     * {{baseUrl}}/api/workflow/case
     */
    public createCase(body: CreateCaseRequestBody): Observable<Case> {
        return this._resourceProvider.post$('workflow/case/', this.SERVER_URL, body).pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Get all cases by user that created them
     * POST
     * {{baseUrl}}/api/workflow/case/author/:id
     */
    public getAllCaseUser(userId: string, body: object): Observable<Array<Case>> {
        return this._resourceProvider.post$('workflow/case/author/' + userId, this.SERVER_URL, body).pipe(
            map(r => this.changeType(r, 'cases'))
        );
    }


    /**
     * Generic case search with QueryDSL predicate
     * POST
     * {{baseUrl}}/api/workflow/case/search2
     */
    public getCasesQueryDSL(body: object): Observable<Page<Case>> {
        return this._resourceProvider.post$('workflow/case/search2', this.SERVER_URL, body).pipe(
            map(r => this.getResourcePage<Case>(r, 'cases'))
        );
    }

    /**
     * Generic case search with object encoded search query. Similar to [getCasesQueryDSL]{@link CaseResourceService#getCasesQueryDSL}
     * POST
     * {{baseUrl}}/api/workflow/case/search_mongo
     * @param body object defining the search query
     * @param params request parameters, that can be used for sorting of results.
     */
    public getCases(body: CaseGetRequestBody, params?: Params): Observable<Page<Case>> {
        return this._resourceProvider.post$('workflow/case/search_mongo', this.SERVER_URL, body, params)
            .pipe(map(r => this.getResourcePage<Case>(r, 'cases')));
    }

    /**
     * Search one case by it's id.
     * GET
     * {{baseUrl}}/api/workflow/case/:id
     */
    public getOneCase(caseId: string): Observable<Case> {
        return this._resourceProvider.get$('workflow/case/' + caseId, this.SERVER_URL).pipe(map(r => this.changeType(r, undefined)));
    }


    /**
     * Get options for enumeration or multiple-choice data field
     * GET
     * {{baseUrl}}/api/workflow/case/:caseId/field/:fieldId
     */
    public getOptionsEnumeration(caseId: string, fieldId: string): Observable<Case> {
        return this._resourceProvider.get$('workflow/case/' + caseId + '/field/' + fieldId, this.SERVER_URL)
            .pipe(map(r => this.changeType(r, undefined)));
    }

}

