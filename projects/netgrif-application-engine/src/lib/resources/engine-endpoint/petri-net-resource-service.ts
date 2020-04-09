import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PetriNet} from '../interface/petri-net';
import {ResourceProvider} from '../resource-provider.service';
import {changeType, getResourceAddress} from '../resource-utility-functions';
import {ConfigurationService} from '../../configuration/configuration.service';
import Transition from '../../process/transition';
import {HttpParams} from '@angular/common/http';
import Transaction from '../../process/transaction';
import NetRole from '../../process/netRole';

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
    public getDataPetriNet(body: object): Observable<PetriNet> {  // TODO: response
        return this.provider.post$('petrinet/data', this.SERVER_URL, body).pipe(map(r => changeType(r, undefined)));
    }

    /**
     * Get Transition References Using
     * GET
     * {{baseUrl}}/api/petrinet/transitions
     */
    public getPetriNetTranstions(NetID: string): Observable<Array<Transition>> {
        return this.provider.get$('/petrinet/transitions', this.SERVER_URL, new HttpParams().set('ids', NetID))
            .pipe(map(r => changeType(r, 'transitionReferences')));
    }

    /**
     * Get Transaction References Using
     * GET
     * {{baseUrl}}/api/petrinet/{id}/transactions
     */
    public getPetriNetTransactions(NetID: string): Observable<Array<Transaction>> {
        return this.provider.get$('/petrinet/' + NetID + '/transactions', this.SERVER_URL)
            .pipe(map(r => changeType(r, 'transactions')));
    }

    /**
     * Get Roles References Using
     * GET
     * {{baseUrl}}/api/petrinet/{id}/transactions
     */
    public getPetriNetRoles(NetID: string): Observable<Array<NetRole>> {
        return this.provider.get$('/petrinet/' + NetID + '/roles', this.SERVER_URL)
            .pipe(map(r => changeType(r, 'processRoles')));
    }
}
