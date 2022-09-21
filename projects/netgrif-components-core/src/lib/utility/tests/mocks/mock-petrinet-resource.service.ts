import { Injectable } from '@angular/core';
import { ProviderProgress } from '../../../resources/resource-provider.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class MockPetrinetResourceService {

    public getNetFile(_netId: string): Observable<ProviderProgress | Blob> {
        return of(new HttpResponse<Blob>()).pipe(
            map(event => { return event.body; }));
    }
}
