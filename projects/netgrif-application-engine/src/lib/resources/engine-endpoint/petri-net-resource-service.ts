import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PetriNet} from '../interface/petri-net';
import {Params, ResourceProvider} from '../resource-provider.service';
import {changeType, getResourceAddress} from '../resource-utility-functions';
import {ConfigurationService} from '../../configuration/configuration.service';
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
    public getAll(): Observable<PetriNet> {
        return this.provider.get$('petrinet', this.SERVER_URL).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get Data Field References Using
     * POST
     * {{baseUrl}}/api/petrinet/data
     */
    public getDataPetriNet(body: object): Observable<any> {  // TODO: response
        return this.provider.post$('petrinet/data', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * get Net File
     * GET
     * {{baseUrl}}/api/petrinet/{netId}/file
     */
    public getNetFile(netId: string, params?: Params): Observable<PetriNet> {  // TODO: response
        return this.provider.get$('petrinet/' + netId + 'file', this.SERVER_URL, params).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * get One Net
     * GET
     * {{baseUrl}}/api/petrinet/{identifier}/{version}
     */
    public getOne(identifier: string, version: string, params?: Params): Observable<PetriNet> {
        return this.provider.get$('petrinet/' + identifier + '/' + version, this.SERVER_URL, params).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * get One Net by ID
     * GET
     * {{baseUrl}}/api/petrinet/{id}
     */
    public getOneById(netId: string, params?: Params): Observable<PetriNet> {
        return this.provider.get$('petrinet/' + netId, this.SERVER_URL, params).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * get Roles
     * GET
     * {{baseUrl}}/api/petrinet/{netId}/roles
     */
    public getRoles(netId: string, params?: Params): Observable<any> { // TODO ..
        return this.provider.get$('petrinet/' + netId + '/roles', this.SERVER_URL, params).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * get Transactions
     * GET
     * {{baseUrl}}/api/petrinet/{netId}/transactions
     */
    public getTransactions(netId: string, params?: Params): Observable<any> { // TODO ..
        return this.provider.get$('petrinet/' + netId + '/transactions', this.SERVER_URL, params).pipe(map(r => changeType(r, undefined)));
    }


    /**
     * get Transition References
     * GET
     * {{baseUrl}}/api/petrinet/transitions
     */
    public getTransitionReferences(netId: string, params?: Params): Observable<any> { // TODO ..
        return this.provider.get$('petrinet/transactions', this.SERVER_URL, params).pipe(map(r => changeType(r, undefined)));
    }


    /**
     * import PetriNet
     * POST
     * {{baseUrl}}/api/petrinet/import
     */
    public importPetriNet(body: object, params?: Params): Observable<MessageResource> {
        return this.provider.post$('petrinet/import', this.SERVER_URL, body, params).pipe(map(r => changeType(r, undefined)));
    }


    /**
     * search PetriNets
     * POST
     * {{baseUrl}}/api/petrinet/search
     */
    public searchPetriNets(body: object, params?: Params): Observable<PetriNet> {
        return this.provider.post$('petrinet/search', this.SERVER_URL, body, params).pipe(map(r => changeType(r, undefined)));
    }
}
