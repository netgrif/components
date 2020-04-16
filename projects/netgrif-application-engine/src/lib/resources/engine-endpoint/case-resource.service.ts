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

@Injectable({
    providedIn: 'root'
})
export class CaseResourceService implements CountService {
    /**
     * @ignore
     */
    private SERVER_URL: string;

    /**
     * @ignore
     */
    protected constructor(protected provider: ResourceProvider, protected _configService: ConfigurationService) {
        this.SERVER_URL = getResourceAddress('case', this._configService.get().providers.resources);
    }

    /**
     * Get count of the cases
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/workflow/case/count
     */
    public count(body: object): Observable<Count> {
        return this.provider.post$('workflow/case/count', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get all cases of the system
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/workflow/all
     */
    public getAllCase(): Observable<Array<Case>> {
        return this.provider.get$('workflow/all', this.SERVER_URL)
            .pipe(map(r => changeType(r, 'cases')));
    }

    /**
     * Generic case search
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/workflow/case/search
     */
    public searchCases(body: object, params?: Params): Observable<Array<Case>> {
        return this.provider.post$('workflow/case/search', this.SERVER_URL, body, params)
            .pipe(map(r => changeType(r, 'cases')));
    }


    /**
     * Delete case
     *
     * **Request Type:** DELETE
     *
     * **Request URL:** {{baseUrl}}/api/workflow/case/:id
     */
    public deleteCase(caseID: string): Observable<MessageResource> {
        return this.provider.delete$('workflow/case/' + caseID, this.SERVER_URL)
            .pipe(map(r => changeType(r, undefined)));
    }


    /**
     * Get all case data
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/workflow/case/:id/data
     */
    public getCaseData(caseID: string): Observable<Array<DataGroupsResource>> {
        return this.provider.get$('workflow/case/' + caseID + '/data', this.SERVER_URL)
            .pipe(map(r => changeType(r, 'dataGroups')));
    }


    /**
     * Download case file field value
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/workflow/case/:id/file/:field
     */
    public getCaseFile(caseID: string, fieldID: string): Observable<FileResource> {
        return this.provider.get$('workflow/case/' + caseID + '/file/' + fieldID, this.SERVER_URL)
            .pipe(map(r => changeType(r, undefined)));
    }


    /**
     * Create new case
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/workflow/case
     */
    public createCase(body: object): Observable<Case> {
        return this.provider.post$('workflow/case/', this.SERVER_URL, body)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get all cases by user that created them
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/workflow/case/author/:id
     */
    public getAllCaseUser(body: object): Observable<Array<Case>> {
        return this.provider.post$('workflow/case/', this.SERVER_URL, body)
            .pipe(map(r => changeType(r, 'cases')));
    }


    /**
     * Generic case search with QueryDSL predicate
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/workflow/case/search2
     */
    public getCasesQueryDSL(body: object): Observable<Array<Case>> {
        return this.provider.post$('workflow/case/', this.SERVER_URL, body)
            .pipe(map(r => changeType(r, 'cases')));
    }


    /**
     * Get options for enumeration or multiple-choice data field
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/workflow/case/:caseId/field/:fieldId
     */
    public getOptionsEnumeration(caseId: string, fieldId: string): Observable<Case> {
        return this.provider.get$('workflow/case/' + caseId + '/field/' + fieldId, this.SERVER_URL)
            .pipe(map(r => changeType(r, undefined)));
    }

}

