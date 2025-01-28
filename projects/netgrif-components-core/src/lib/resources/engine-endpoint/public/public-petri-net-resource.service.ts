import { Injectable } from '@angular/core';
import {PetriNetResourceService} from '../petri-net-resource.service';
import {Params, ResourceProvider} from '../../resource-provider.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {Observable} from 'rxjs';
import {PetriNet} from '../../interface/petri-net';
import {PetriNetReference} from '../../interface/petri-net-reference';
import {map} from 'rxjs/operators';
import {PetriNetRequestBody} from '../../interface/petri-net-request-body';
import {Page} from '../../interface/page';
import Transaction from '../../../process/transaction';
import Transition from '../../../process/transition';
import {HttpParams} from '@angular/common/http';
import RolesAndPermissions from '../../../process/rolesAndPermissions';

@Injectable({
  providedIn: 'root'
})
export class PublicPetriNetResourceService extends PetriNetResourceService {

    constructor(protected provider: ResourceProvider, protected _configService: ConfigurationService) {
        super(provider, _configService);
    }

    /**
     * get One Net by ID
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/public/petrinet/{id}
     */
    public getOneById(netId: string, params?: Params): Observable<PetriNet> {
        return this.provider.get$('public/petrinet/' + netId, this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, undefined)));
    }

    /**
     * get One Net
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/public/petrinet/{identifier}/{version}
     */
    public getOne(identifier: string, version: string, params?: Params): Observable<PetriNetReference> {
        return this.provider.get$('public/petrinet/' + btoa(identifier) + '/' + version, this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, 'petriNetReferences')));
    }

    /**
     * search PetriNets
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/search
     */
    public searchPetriNets(body: PetriNetRequestBody, params?: Params): Observable<Page<PetriNetReference>> {
        return this._resourceProvider.post$('public/petrinet/search', this.SERVER_URL, body, params)
            .pipe(map(r => this.getResourcePage<PetriNetReference>(r, 'petriNetReferences')));
    }

    /**
     * Get Roles References Using
     *
     * **Request Type:** GET
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/{id}/roles
     */
    public getPetriNetRoles(netId: string, params?: Params): Observable<RolesAndPermissions> {
        return this._resourceProvider.get$('public/petrinet/' + netId + '/roles', this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, 'processRoles')));
    }

    /**
     * Get Data Field References Using
     *
     * **Request Type:** POST
     *
     * **Request URL:** {{baseUrl}}/api/petrinet/data
     */
    public getDataPetriNet(body: object): Observable<any> {  // TODO: response
        return this._resourceProvider.post$('public/petrinet/data', this.SERVER_URL, body)
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
        return this._resourceProvider.get$('public/petrinet/transitions', this.SERVER_URL, new HttpParams().set('ids', netId))
            .pipe(map(r => this.changeType(r, 'transitionReferences')));
    }
}
