import { Injectable } from '@angular/core';
import {Params, ProviderProgress} from '../../../resources/resource-provider.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import {PetriNetRequestBody} from "../../../resources/interface/petri-net-request-body";
import {Page} from "../../../resources/interface/page";
import {PetriNetReference} from "../../../resources/interface/petri-net-reference";

@Injectable()
export class MockPetrinetResourceService {

    public getNetFile(_netId: string): Observable<ProviderProgress | Blob> {
        return of(new HttpResponse<Blob>()).pipe(
            map(event => { return event.body; }));
    }

    public searchElasticPetriNets(body: PetriNetRequestBody, params?: Params): Observable<Page<PetriNetReference>> {
        return of()
    }

    public searchPetriNets(body: PetriNetRequestBody, params?: Params): Observable<Page<PetriNetReference>> {
        return of()
    }
}
