import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {PetriNet} from '../interface/petri-net';
import {Params, ProviderProgress, ResourceProvider} from '../resource-provider.service';
import {changeType, getResourceAddress, getResourcePage} from '../resource-utility-functions';
import {ConfigurationService} from '../../configuration/configuration.service';
import Transition from '../../process/transition';
import {HttpEventType, HttpParams} from '@angular/common/http';
import Transaction from '../../process/transaction';
import NetRole from '../../process/netRole';
import {MessageResource, PetriNetMessageResource} from '../interface/message-resource';
import {PetriNetReference} from '../interface/petri-net-reference';
import {PetriNetRequestBody} from '../interface/petri-net-request-body';
import {Page} from '../interface/page';

@Injectable({
    providedIn: 'root'
})
export class PetriNetResourceService {
    /**
     * @ignore
     */
    private SERVER_URL: string;

    /**
     * @ignore
     */
    protected constructor(protected provider: ResourceProvider, protected _configService: ConfigurationService) {
        this.SERVER_URL = getResourceAddress('petrinet', this._configService.get().providers.resources);
    }

    /**
     * Get All Using Petri Net
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet
     */
    public getAll(params?: Params): Observable<Array<PetriNetReference>> {
        return this.provider.get$('petrinet', this.SERVER_URL, params)
            .pipe(map(r => changeType(r, 'petriNetReferences')));
    }

    /**
     * Get Data Field References Using
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/data
     */
    public getDataPetriNet(body: object): Observable<any> {  // TODO: response
        return this.provider.post$('petrinet/data', this.SERVER_URL, body)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get Transition References Using
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/transitions
     */
    public getPetriNetTranstions(netId: string): Observable<Array<Transition>> {
        return this.provider.get$('/petrinet/transitions', this.SERVER_URL, new HttpParams().set('ids', netId))
            .pipe(map(r => changeType(r, 'transitionReferences')));
    }

    /**
     * Get Transaction References Using
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{id}/transactions
     */
    public getPetriNetTransactions(netId: string, params?: Params): Observable<Array<Transaction>> {
        return this.provider.get$('/petrinet/' + netId + '/transactions', this.SERVER_URL, params)
            .pipe(map(r => changeType(r, 'transactions')));
    }

    /**
     * Get Roles References Using
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{id}/roles
     */
    public getPetriNetRoles(netId: string, params?: Params): Observable<Array<NetRole>> {
        return this.provider.get$('/petrinet/' + netId + '/roles', this.SERVER_URL, params)
            .pipe(map(r => changeType(r, 'processRoles')));
    }

    /**
     * get Net File
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{netId}/file
     */
    public getNetFile(netId: string, params?: Params): Observable<any> {  // TODO: response
        return this.provider.get$('petrinet/' + netId + '/file', this.SERVER_URL, params)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * get One Net
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{identifier}/{version}
     */
    public getOne(identifier: string, version: string, params?: Params): Observable<PetriNetReference> {
        return this.provider.get$('petrinet/' + identifier + '/' + version, this.SERVER_URL, params)
            .pipe(map(r => changeType(r, 'petriNetReferences')));
    }

    /**
     * get One Net by ID
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{id}
     */
    public getOneById(netId: string, params?: Params): Observable<PetriNet> {
        return this.provider.get$('petrinet/' + netId, this.SERVER_URL, params)
            .pipe(map(r => changeType(r, undefined)));
    }


    /**
     * import PetriNet
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/import
     */
    public importPetriNet(body: FormData, params?: Params): Observable<ProviderProgress | PetriNetMessageResource> {
        return this.provider.postWithEvent$<MessageResource>('petrinet/import', this.SERVER_URL, body, params).pipe(
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
        return this.provider.post$('petrinet/search', this.SERVER_URL, body, params)
            .pipe(map(r => getResourcePage<PetriNetReference>(r, 'petriNetReferences')));
    }
}
