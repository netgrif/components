import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConfigurationService} from '../../configuration/configuration.service';
import {ResourceProvider} from '../../resources/resource-provider.service';
import {PetriNet} from '../../resources/interface/petri-net';
import {changeType} from '../../resources/resource-utility-functions';


@Injectable({
    providedIn: 'root'
})
export class PetriNetResourceService {

    private SERVER_URL: string;

    protected constructor(protected provider: ResourceProvider, protected _configService: ConfigurationService) {
        this.SERVER_URL = this._configService.get().providers.resources[0].address;
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
}
