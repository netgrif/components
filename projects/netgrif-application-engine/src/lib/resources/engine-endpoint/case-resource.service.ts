import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Params, ResourceProvider} from '../resource-provider.service';
import {Count} from '../interface/count';
import {Case} from '../interface/case';
import {changeType, getResourceAddress} from '../resource-utility-functions';
import {MessageResource} from '../interface/message-resource';
import {DataGroupsResource} from '../interface/data-groups';
import {FileResource} from '../interface/file-resource';
import {ConfigurationService} from '../../configuration/configuration.service';
import {CountService} from '../abstract-endpoint/count-service';
import {Filter} from '../../filter/models/filter';
import {FilterType} from '../../filter/models/filter-type';

@Injectable({
    providedIn: 'root'
})
export class CaseResourceService implements CountService {
    private SERVER_URL: string;

    protected constructor(protected provider: ResourceProvider, protected _configService: ConfigurationService) {
        this.SERVER_URL = getResourceAddress('case', this._configService.get().providers.resources);
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
        return this.provider.post$('workflow/case/count', this.SERVER_URL, filter.getRequestBody(), filter.getRequestParams())
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get all cases of the system
     * GET
     * {{baseUrl}}/api/workflow/all
     */
    public getAllCase(): Observable<Array<Case>> {
        return this.provider.get$('workflow/all', this.SERVER_URL).pipe(map(r => changeType(r, 'cases')));
    }

    /**
     * Generic case search
     * POST
     * {{baseUrl}}/api/workflow/case/search
     */
    public searchCases(filter: Filter, params?: Params): Observable<Array<Case>> {
        if (filter.type !== FilterType.CASE) {
            throw new Error('Provided filter doesn\'t have type CASE');
        }
        params = ResourceProvider.combineParams(filter.getRequestParams(), params);
        return this.provider.post$('workflow/case/search', this.SERVER_URL, filter.getRequestBody(), params)
            .pipe(map(r => changeType(r, 'cases')));
    }


    /**
     * Delete case
     * DELETE
     * {{baseUrl}}/api/workflow/case/:id
     */
    public deleteCase(caseID: string): Observable<MessageResource> {
        return this.provider.delete$('workflow/case/' + caseID, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
    }


    /**
     * Get all case data
     * GET
     * {{baseUrl}}/api/workflow/case/:id/data
     */
    public getCaseData(caseID: string): Observable<Array<DataGroupsResource>> {
        return this.provider.get$('workflow/case/' + caseID + '/data', this.SERVER_URL).pipe(map(r => changeType(r, 'dataGroups')));
    }


    /**
     * Download case file field value
     * GET
     * {{baseUrl}}/api/workflow/case/:id/file/:field
     */
    public getCaseFile(caseID: string, fieldID: string): Observable<FileResource> {
        return this.provider.get$('workflow/case/' + caseID + '/file/' + fieldID, this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
    }


    /**
     * Create new case
     * POST
     * {{baseUrl}}/api/workflow/case
     */
    public createCase(body: object): Observable<Case> {
        return this.provider.post$('workflow/case/', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get all cases by user that created them
     * POST
     * {{baseUrl}}/api/workflow/case/author/:id
     */
    public getAllCaseUser(body: object): Observable<Array<Case>> {
        return this.provider.post$('workflow/case/', this.SERVER_URL, body).pipe(map(r => changeType(r, 'cases')));
    }


    /**
     * Generic case search with QueryDSL predicate
     * POST
     * {{baseUrl}}/api/workflow/case/search2
     */
    public getCasesQueryDSL(body: object): Observable<Array<Case>> {
        return this.provider.post$('workflow/case/', this.SERVER_URL, body).pipe(map(r => changeType(r, 'cases')));
    }


    /**
     * Get options for enumeration or multiple-choice data field
     * GET
     * {{baseUrl}}/api/workflow/case/:caseId/field/:fieldId
     */
    public getOptionsEnumeration(caseId: string, fieldId: string): Observable<Case> {
        return this.provider.get$('workflow/case/' + caseId + '/field/' + fieldId, this.SERVER_URL)
                            .pipe(map(r => changeType(r, undefined)));
    }

}

