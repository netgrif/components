import { Injectable } from '@angular/core';
import {PetriNetResourceService} from '../petri-net-resource.service';
import {Params, ResourceProvider} from '../../resource-provider.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {Observable} from 'rxjs';
import {PetriNet} from '../../interface/petri-net';
import {PetriNetReference} from '../../interface/petri-net-reference';
import {map} from 'rxjs/operators';

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
        return this.provider.get$('public/petrinet/' + identifier + '/' + version, this.SERVER_URL, params)
            .pipe(map(r => this.changeType(r, 'petriNetReferences')));
    }
}
