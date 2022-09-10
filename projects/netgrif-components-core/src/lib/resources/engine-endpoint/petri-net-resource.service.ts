import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {PetriNet} from '../interface/petri-net';
import {Params, ProviderProgress, ResourceProvider} from '../resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import Transition from '../../process/transition';
import {HttpEventType, HttpParams} from '@angular/common/http';
import Transaction from '../../process/transaction';
import {EventOutcomeMessageResource, MessageResource} from '../interface/message-resource';
import {PetriNetReference} from '../interface/petri-net-reference';
import {PetriNetRequestBody} from '../interface/petri-net-request-body';
import {Page} from '../interface/page';
import {processMessageResponse} from '../../utility/process-message-response';
import {AbstractResourceService} from '../abstract-endpoint/abstract-resource.service';
import RolesAndPermissions from '../../process/rolesAndPermissions';
import {PetriNetImport} from '../interface/petri-net-import';

@Injectable({
    providedIn: 'root'
})
export class PetriNetResourceService extends AbstractResourceService {

    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super('petrinet', provider, configService);
    }

    /**
     * Get All Using Petri Net
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet
     */
    public getAll(params?: Params): Observable<Array<PetriNetReference>> {
        return this._resourceProvider.get$('petrinet', this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, 'petriNetReferences')));
    }

    /**
     * Get Data Field References Using
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/data
     */
    public getDataPetriNet(body: object): Observable<any> {  // TODO: response
        return this._resourceProvider.post$('petrinet/data', this.SERVER_URL, body)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * Get Transition References Using
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/transitions
     */
    public getPetriNetTransitions(netId: string): Observable<Array<Transition>> {
        return this._resourceProvider.get$('/petrinet/transitions', this.SERVER_URL, new HttpParams().set('ids', netId))
            .pipe(map(r => this.changeType(r, 'transitionReferences')));
    }

    /**
     * Get Transaction References Using
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{id}/transactions
     */
    public getPetriNetTransactions(netId: string, params?: Params): Observable<Array<Transaction>> {
        return this._resourceProvider.get$('/petrinet/' + netId + '/transactions', this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, 'transactions')));
    }

    /**
     * Get Roles References Using
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{id}/roles
     */
    public getPetriNetRoles(netId: string, params?: Params): Observable<RolesAndPermissions> {
        return this._resourceProvider.get$('/petrinet/' + netId + '/roles', this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * get Net File
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{netId}/file
     */
    public getNetFile(netId: string, params?: Params): Observable<any> {  // TODO: response
        return this._resourceProvider.get$('petrinet/' + netId + '/file', this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * get One Net
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{identifier}/{version}
     */
    public getOne(identifier: string, version: string, params?: Params): Observable<PetriNetReference> {
        return this._resourceProvider.get$('petrinet/' + btoa(identifier) + '/' + version, this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, 'petriNetReferences')));
    }

    /**
     * get One Net by ID
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{id}
     */
    public getOneById(netId: string, params?: Params): Observable<PetriNet> {
        return this._resourceProvider.get$('petrinet/' + netId, this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }


    /**
     * import PetriNet
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/import
     */
    public importPetriNet(body: FormData, params?: Params): Observable<ProviderProgress | EventOutcomeMessageResource> {
        return this._resourceProvider.postWithEvent$<MessageResource>('petrinet/import', this.SERVER_URL, body, params).pipe(
            map(event => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        return ResourceProvider.getProgress(event);
                    case HttpEventType.Response:
                        return ResourceProvider.processMessageResource(event);
                    default:
                        return undefined;
                }
            }),
            filter(value => !!value)
        );
    }


    /**
     * search PetriNets
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/search
     */
    public searchPetriNets(body: PetriNetRequestBody, params?: Params): Observable<Page<PetriNetReference>> {
        return this._resourceProvider.post$('petrinet/search', this.SERVER_URL, body, params)
            .pipe(map(r => this.getResourcePage<PetriNetReference>(r, 'petriNetReferences')));
    }

    /**
     * delete PetriNet
     *
     * **Request Type:** DELETE
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{id}
     *
     * @param netId stringId of the deleted Petri Net
     */
    public deletePetriNet(netId: string): Observable<MessageResource> {
        return this._resourceProvider.delete$<MessageResource>('petrinet/' + netId, this.SERVER_URL)
            .pipe(switchMap(processMessageResponse));
    }

    /**
     * get One Net by ID
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{id}
     */
    public getNetByCaseId(caseId: string, params?: Params): Observable<PetriNetImport> {
        return this._resourceProvider.get$('petrinet/case/' + caseId, this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }
}
