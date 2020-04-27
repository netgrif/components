import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {PetriNet} from '../interface/petri-net';
import {Params, ProgressType, ProviderProgress, ResourceProvider} from '../resource-provider.service';
import {changeType, getResourceAddress} from '../resource-utility-functions';
import {ConfigurationService} from '../../configuration/configuration.service';
import Transition from '../../process/transition';
import {HttpEventType, HttpParams} from '@angular/common/http';
import Transaction from '../../process/transaction';
import NetRole from '../../process/netRole';
import {Net} from '../../process/net';
import {MessageResource} from '../interface/message-resource';

@Injectable({
    providedIn: 'root'
})
export class PetriNetResourceService {

    private SERVER_URL: string;

    protected constructor(protected provider: ResourceProvider, protected _configService: ConfigurationService) {
        this.SERVER_URL = getResourceAddress('petrinet', this._configService.get().providers.resources);
    }

    /**
     * Get All Using Petri Net
     * GET
     * {{baseUrl}}/api/petrinet
     */
    public getAll(): Observable<Array<Net>> {
        return this.provider.get$('petrinet', this.SERVER_URL)
            .pipe(map(r => changeType(r, 'petriNetReferences')));
    }

    /**
     * Get Data Field References Using
     * POST
     * {{baseUrl}}/api/petrinet/data
     */
    public getDataPetriNet(body: object): Observable<any> {  // TODO: response
        return this.provider.post$('petrinet/data', this.SERVER_URL, body)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get Transition References Using
     * GET
     * {{baseUrl}}/api/petrinet/transitions
     */
    public getPetriNetTranstions(netId: string): Observable<Array<Transition>> {
        return this.provider.get$('/petrinet/transitions', this.SERVER_URL, new HttpParams().set('ids', netId))
            .pipe(map(r => changeType(r, 'transitionReferences')));
    }

    /**
     * Get Transaction References Using
     * GET
     * {{baseUrl}}/api/petrinet/{id}/transactions
     */
    public getPetriNetTransactions(netId: string, params?: Params): Observable<Array<Transaction>> {
        return this.provider.get$('/petrinet/' + netId + '/transactions', this.SERVER_URL, params)
            .pipe(map(r => changeType(r, 'transactions')));
    }

    /**
     * Get Roles References Using
     * GET
     * {{baseUrl}}/api/petrinet/{id}/roles
     */
    public getPetriNetRoles(netId: string, params?: Params): Observable<Array<NetRole>> {
        return this.provider.get$('/petrinet/' + netId + '/roles', this.SERVER_URL, params)
            .pipe(map(r => changeType(r, 'processRoles')));
    }

    /**
     * get Net File
     * GET
     * {{baseUrl}}/api/petrinet/{netId}/file
     */
    public getNetFile(netId: string, params?: Params): Observable<any> {  // TODO: response
        return this.provider.get$('petrinet/' + netId + '/file', this.SERVER_URL, params)
            .pipe(map(r => changeType(r, undefined)));
    }

    /**
     * get One Net
     * GET
     * {{baseUrl}}/api/petrinet/{identifier}/{version}
     */
    public getOne(identifier: string, version: string, params?: Params): Observable<Net> {
        return this.provider.get$('petrinet/' + identifier + '/' + version, this.SERVER_URL, params)
            .pipe(map(r => changeType(r, 'petriNetReferences')));
    }

    /**
     * get One Net by ID
     * GET
     * {{baseUrl}}/api/petrinet/{id}
     */
    public getOneById(netId: string, params?: Params): Observable<PetriNet> {
        return this.provider.get$('petrinet/' + netId, this.SERVER_URL, params)
            .pipe(map(r => changeType(r, undefined)));
    }


    /**
     * import PetriNet
     * POST
     * {{baseUrl}}/api/petrinet/import
     */
    public importPetriNet(body: FormData, params?: Params): Observable<ProviderProgress | MessageResource> {
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
     * POST
     * {{baseUrl}}/api/petrinet/search
     */
    public searchPetriNets(body: object, params?: Params): Observable<PetriNet> {
        return this.provider.post$('petrinet/search', this.SERVER_URL, body, params)
            .pipe(map(r => changeType(r, undefined)));
    }
}
